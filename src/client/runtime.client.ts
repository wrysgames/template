import { Flamework, Modding } from '@flamework/core';
import Log, { Logger } from '@rbxts/log';
import { setupLogger } from 'shared/utils/logger';

function start(): void {
	setupLogger();

	Log.Info('Client version: {Version}', game.PlaceVersion);

	Modding.registerDependency<Logger>((ctor) => {
		return Log.ForContext(ctor);
	});
	Flamework.addPathsGlob('src/client/**/controllers');
	Flamework.ignite();

	Log.Info('Controllers successfully loaded');
}

start();
