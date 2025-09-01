import React from '@rbxts/react';
import { RemProvider } from './rem-provider';

export function RootProvider({ children }: React.PropsWithChildren<{}>) {
	return <RemProvider>{children}</RemProvider>;
}
