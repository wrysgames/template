import { useSpring, useUnmountEffect } from '@rbxts/pretty-react-hooks';
import React, { useEffect, useState } from '@rbxts/react';
import { Frame, List } from '@rbxts/ui';
import { gamePhaseAtom } from 'client/ui/atoms/game-phase.atom';
import { useLoadingSequence } from 'client/ui/hooks/use-loading-sequence';
import { useRem } from 'client/ui/hooks/use-rem';
import Fonts from 'shared/theme/fonts';
import { LoadingDot } from './loading-dot';

interface LoadingScreenProps {
	visible?: boolean;
}

const STEPS: (() => Promise<void>)[] = [
	async () => {
		task.wait(1);
	},
	async () => {
		task.wait(3);
	},
	async () => {
		task.wait(1);
	},
];

export function LoadingScreen({ visible }: LoadingScreenProps) {
	const rem = useRem();

	const { step } = useLoadingSequence(STEPS, () => {
		gamePhaseAtom('main');
	});

	const transparency = useSpring(visible ? 0 : 1, {
		frequency: 0.6,
		damping: 0.8,
	});

	return (
		<canvasgroup
			Active={visible}
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
				size={new UDim2(0.5, 0, 0.05, 0)}
				position={UDim2.fromScale(0.5, 0.5)}
				anchorPoint={new Vector2(0.5, 0.5)}
			>
				{STEPS.map((_, index) => (
					<LoadingDot animate={step === index} active={step >= index} />
				))}
				<List padding={rem(2)} horizontalAlignment={Enum.HorizontalAlignment.Center} axis="horizontal" />
			</Frame>
			<textlabel
				Size={new UDim2(0.5, 0, 0.05, 0)}
				Text={step > 2 ? 'Loading complete' : 'Loading'}
				BackgroundTransparency={1}
				TextSize={rem(3)}
				FontFace={Fonts.Montserratt.Bold}
			/>
		</canvasgroup>
	);
}
