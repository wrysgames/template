import Log from '@rbxts/log';
import { useEffect, useRef, useState } from '@rbxts/react';

const DELAY_BEFORE_COMPLETE = 1.5;

export function useLoadingSequence(steps: (() => Promise<void>)[], onComplete?: () => void) {
	const [step, setStep] = useState<number>(0);
	const [complete, setComplete] = useState<boolean>(false);
	const [skipped, setSkipped] = useState<boolean>(false);
	const hasCompleted = useRef<boolean>(false);

	const completed = () => {
		if (hasCompleted.current) {
			return;
		}
		hasCompleted.current = true;
		setComplete(true);
		onComplete?.();
		Log.Info('Load sequence completed');
	};

	const skip = () => {
		if (!hasCompleted.current) {
			Log.Warn('Skipped load sequence');
			setSkipped(true);
			completed();
		}
	};
	useEffect(() => {
		const runSteps = async () => {
			let i = 0;
			for (const stepFunction of steps) {
				if (complete) {
					break;
				}
				await stepFunction();
				Log.Verbose('Loading phase {Phase} completed', i);
				setStep(++i);
			}
			setComplete(true);
			task.delay(DELAY_BEFORE_COMPLETE, () => {
				completed();
			});
		};

		runSteps();
	}, []);

	return { step, complete, skip, skipped };
}
