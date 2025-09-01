import Log, { LogLevel } from '@rbxts/log';
import { $NODE_ENV } from 'rbxts-transform-env';

export const LOG_LEVEL: LogLevel = $NODE_ENV === 'development' ? LogLevel.Debugging : LogLevel.Information;

export function setupLogger(): void {
	Log.SetLogger(Log.Configure().WriteTo(Log.RobloxOutput()).Create());
}
