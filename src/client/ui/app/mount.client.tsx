import Log from '@rbxts/log';
import React, { StrictMode } from '@rbxts/react';
import { createPortal, createRoot } from '@rbxts/react-roblox';
import { Players } from '@rbxts/services';
import { RootProvider } from '../providers/root-provider';
import { App } from './app';

function mount(): void {
	const root = createRoot(new Instance('Folder'));
	const target = Players.LocalPlayer.WaitForChild('PlayerGui');

	root.render(
		createPortal(
			<StrictMode>
				<RootProvider>
					<App />
				</RootProvider>
			</StrictMode>,
			target,
		),
	);

	Log.Info('Loaded UI');
}

mount();
