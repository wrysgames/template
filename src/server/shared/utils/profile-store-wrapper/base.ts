import ProfileStore from '@rbxts/profile-store';

export abstract class ProfileStoreWrapper<T extends object> {
	protected store: ProfileStore.Store<T>;

	constructor(
		protected name: string,
		protected template: T,
	) {
		this.store = ProfileStore.New(name, template);
	}

	abstract init(): void;
}
