import { useSpring } from '@rbxts/pretty-react-hooks';
import React, { useEffect, useState } from '@rbxts/react';
import { Frame } from '@rbxts/ui';
import { Circle } from '../ui/circle';

interface LoadingDotProps {
	animate?: boolean;
	active?: boolean;
}

const SCALE_MAGNITUDE = 0.25;

export function LoadingDot({ animate, active }: LoadingDotProps) {
	const [goal, setGoal] = useState(UDim2.fromScale(0, 0));

	const dotColor = useSpring(active ? new Color3(0, 0, 0) : new Color3(0.89, 0.89, 0.89), {
		frequency: 0.5,
		damping: 0.8,
	});

	const position = useSpring(goal, {
		frequency: 1,
		damping: 0.6,
	});

	useEffect(() => {
		let running = true;

		if (animate) {
			const up = UDim2.fromScale(0, SCALE_MAGNITUDE);
			const down = UDim2.fromScale(0, -SCALE_MAGNITUDE);
			let goingUp = true;

			task.spawn(() => {
				while (running) {
					setGoal(goingUp ? up : down);

					goingUp = !goingUp;
					task.wait(0.5);
				}
			});
		} else {
			setGoal(UDim2.fromScale(0, 0));
		}

		return () => {
			running = false;
		};
	}, [animate]);

	return (
		<Frame backgroundTransparency={1} size={UDim2.fromScale(1, 1)}>
			<uisizeconstraint MaxSize={new Vector2(32, 32)} />
			<Circle position={position} backgroundColor={dotColor} size={UDim2.fromScale(1, 1)} />
		</Frame>
	);
}
