import React from '@rbxts/react';
import { useAtom } from '@rbxts/react-charm';
import { Frame, Layer } from '@rbxts/ui';
import { gamePhaseAtom } from '../atoms/game-phase.atom';
import { ErrorHandler } from '../components/error-handler';
import { LoadingScreen } from '../components/loading-screen';

export function App() {
	const gamePhase = useAtom(gamePhaseAtom);

	return (
		<ErrorHandler>
			<Layer>
				<LoadingScreen visible={gamePhase === 'loading'} />
			</Layer>

			<Layer>
				<Frame
					backgroundColor={new Color3(1, 1, 1)}
					size={UDim2.fromOffset(50, 50)}
					position={UDim2.fromScale(1, 1)}
					anchorPoint={new Vector2(1, 1)}
				/>
			</Layer>
		</ErrorHandler>
	);
}
