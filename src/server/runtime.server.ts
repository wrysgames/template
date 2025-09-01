import { Flamework, Modding } from '@flamework/core';
import Log, { Logger } from '@rbxts/log';
import { $NODE_ENV } from 'rbxts-transform-env';
import { setupLogger } from 'shared/utils/logger';

function start(): void {
	setupLogger();

	Log.Info('Environment: {Environment}', $NODE_ENV);
	Log.Info('Server version: {Version}', game.PlaceVersion);

	Modding.registerDependency<Logger>((ctor) => {
		return Log.ForContext(ctor);
	});
	Flamework.addPathsGlob('src/server/**/services');

	try {
		Flamework.ignite();
		Log.Info('Services successfully loaded');
	} catch {
		Log.Fatal('Services could not be loaded');
	}
}

start();
