import React, { useEffect } from '@rbxts/react';
import { Frame, List } from '@rbxts/ui';
import { gamePhaseAtom } from 'client/ui/atoms/game-phase.atom';
import { useRem } from 'client/ui/hooks/use-rem';
import Fonts from 'shared/theme/fonts';
import { LoadingDot } from './loading-dot';

export function LoadingScreen() {
	const rem = useRem();

	useEffect(() => {
		task.delay(99, () => {
			gamePhaseAtom('main');
		});
	});
	return (
		<canvasgroup BackgroundColor3={new Color3(1, 1, 1)} Size={UDim2.fromScale(1, 1)}>
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
				<LoadingDot animate />
				<LoadingDot />
				<LoadingDot />
				<List padding={rem(2)} horizontalAlignment={Enum.HorizontalAlignment.Center} axis="horizontal" />
			</Frame>
			<textlabel
				Text={'Loading'}
				BackgroundTransparency={1}
				TextSize={rem(3)}
				FontFace={Fonts.Montserratt.Bold}
			/>
		</canvasgroup>
	);
}
