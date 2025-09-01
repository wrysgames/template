import Log from '@rbxts/log';
import { useEffect, useState } from '@rbxts/react';

const DELAY_BEFORE_COMPLETE = 1.5;

export function useLoadingSequence(steps: (() => Promise<void>)[], onComplete?: () => void) {
	const [step, setStep] = useState<number>(0);
	const [complete, setComplete] = useState<boolean>(false);
	const [skipped, setSkipped] = useState<boolean>(false);

	const completed = () => {
		onComplete?.();
	};

	const skip = () => {
		if (!complete) {
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
				if (!complete) {
					completed();
				}
			});
		};

		runSteps();
	}, []);

	return { step, complete, skip, skipped };
}
