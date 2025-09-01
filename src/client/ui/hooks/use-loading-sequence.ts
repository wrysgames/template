import { useEffect, useState } from '@rbxts/react';

const DELAY_BEFORE_COMPLETE = 2;

export function useLoadingSequence(steps: (() => Promise<void>)[], onComplete?: () => void) {
	const [step, setStep] = useState<number>(0);
	const [complete, setComplete] = useState<boolean>(false);

	useEffect(() => {
		const runSteps = async () => {
			let i = 0;
			for (const stepFunction of steps) {
				await stepFunction();
				setStep(++i);
			}
			task.delay(DELAY_BEFORE_COMPLETE, () => {
				setComplete(true);
				onComplete?.();
			});
		};

		runSteps();
	}, []);

	return { step, complete };
}
