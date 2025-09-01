import { useSpring } from '@rbxts/pretty-react-hooks';
import React, { useEffect, useState } from '@rbxts/react';
import { Frame } from '@rbxts/ui';
import { Circle } from '../ui/circle';

interface LoadingDotProps {
	animate?: boolean;
}

export function LoadingDot({ animate }: LoadingDotProps) {
	const [goal, setGoal] = useState(UDim2.fromOffset(32, 32));
	const position = useSpring(goal, {
		frequency: 0.7,
		damping: 0.6,
	});

	useEffect(() => {
		let running = true;

		if (animate) {
			const up = UDim2.fromOffset(32, 24);
			const down = UDim2.fromOffset(32, 40);
			let goingUp = true;

			task.spawn(() => {
				while (running) {
					setGoal(goingUp ? up : down);

					goingUp = !goingUp;
					task.wait(0.5); // 500ms
				}
			});
		}

		return () => {
			running = false;
		};
	}, [animate]);

	return (
		<Frame backgroundTransparency={1} size={UDim2.fromOffset(32, 32)}>
			<Circle position={position} backgroundColor={new Color3(0, 0, 0)} size={UDim2.fromScale(1, 1)} />
		</Frame>
	);
}
