import React from '@rbxts/react';
import { Corner, Frame, FrameProps } from '@rbxts/ui';

export function Circle(props: FrameProps) {
	return (
		<Frame {...props}>
			<Corner radius={new UDim(1, 0)} />
			<uiaspectratioconstraint AspectRatio={1} />
		</Frame>
	);
}
