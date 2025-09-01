import { useSpring } from '@rbxts/pretty-react-hooks';
import React, { useEffect, useState } from '@rbxts/react';
import { Frame, List } from '@rbxts/ui';
import { gamePhaseAtom } from 'client/ui/atoms/game-phase.atom';
import { useRem } from 'client/ui/hooks/use-rem';
import Fonts from 'shared/theme/fonts';
import { LoadingDot } from './loading-dot';

interface LoadingScreenProps {
	visible?: boolean;
}

export function LoadingScreen({ visible }: LoadingScreenProps) {
	const rem = useRem();

	const [step, setStep] = useState(0);

	const transparency = useSpring(visible ? 0 : 1, {
		frequency: 1,
		damping: 0.9,
	});

	useEffect(() => {
		const steps = [
			() => {
				// preload assets
				task.wait(2);
			},
			() => {
				// fetch player data
				task.wait(3);
			},
			() => {
				// change game phase from 'loading' to 'main'
				gamePhaseAtom('main');
			},
		];

		const runSteps = async () => {
			for (const stepFunction of steps) {
				stepFunction();
				setStep(math.min(step + 1));
			}
			task.delay(2, () => {
				gamePhaseAtom('main');
			});
		};

		runSteps();
	});
	return (
		<canvasgroup
			GroupTransparency={transparency}
			BackgroundColor3={new Color3(1, 1, 1)}
			Size={UDim2.fromScale(1, 1)}
		>
			<List
				padding={rem(2)}
				verticalAlignment={Enum.VerticalAlignment.Center}
				horizontalAlignment={Enum.HorizontalAlignment.Center}
				axis="vertical"
			/>
			<Frame
				backgroundTransparency={1}
				size={new UDim2(0.5, 0, 0.1, 0)}
				position={UDim2.fromScale(0.5, 0.5)}
				anchorPoint={new Vector2(0.5, 0.5)}
			>
				<LoadingDot animate={step === 0} />
				<LoadingDot animate={step === 1} />
				<LoadingDot animate={step === 2} />
				<List padding={rem(2)} horizontalAlignment={Enum.HorizontalAlignment.Center} axis="horizontal" />
			</Frame>
			<textlabel
				Text={step > 2 ? 'Loading complete' : 'Loading'}
				BackgroundTransparency={1}
				TextSize={rem(3)}
				FontFace={Fonts.Montserratt.Bold}
			/>
		</canvasgroup>
	);
}
