import React from '@rbxts/react';
import { Frame, Group, Layer } from '@rbxts/ui';

export function App() {
	return (
		<Layer>
			<Frame
				backgroundColor={new Color3(1, 1, 1)}
				size={UDim2.fromOffset(50, 50)}
				position={UDim2.fromScale(1, 1)}
				anchorPoint={new Vector2(1, 1)}
			/>
		</Layer>
	);
}
