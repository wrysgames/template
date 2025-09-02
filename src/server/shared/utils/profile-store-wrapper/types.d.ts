import { Profile } from '@rbxts/profile-store';

export interface RegisterStoreConfigs<Template extends object = {}> {
	template: Template;
	key?: string;
	onLoad?: (player: Player, profile: Profile<Template>) => void;
}
