import { Flamework, Modding } from '@flamework/core';
import Log, { Logger } from '@rbxts/log';

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.addPathsGlob('src/server/**/*/services');

Flamework.ignite();
