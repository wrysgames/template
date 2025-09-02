import Log from '@rbxts/log';
import { observePlayer } from '@rbxts/observers';
import { Profile } from '@rbxts/profile-store';
import { Players } from '@rbxts/services';
import { ProfileStoreWrapper } from './base';

export class PlayerProfileStore<T extends object> extends ProfileStoreWrapper<T> {
	private profiles: Map<Player, Profile<T>> = new Map();

	constructor(
		name: string,
		template: T,
		private onLoad?: (player: Player, profile: Profile<T>) => void,
		private onSessionEnd?: (player: Player) => void,
	) {
		super(name, template);
	}

	public init(): void {
		for (const player of Players.GetPlayers()) {
			task.spawn(() => {
				this.attach(player);
			});
		}
		observePlayer((player) => {
			this.attach(player);
			return () => {
				this.detach(player);
			};
		});

		Log.Info('Initialized store {Store}', this.name);
	}

	public attach(player: Player): void {
		Log.Debug('Attaching profile for {Player}', player.Name);

		const profile = this.store.StartSessionAsync(`${player.UserId}`, {
			Cancel: () => player.Parent !== game.GetService('Players'),
		});

		if (!profile) {
			Log.Fatal('Profile failed to load for {Player}', player.Name);
			player.Kick('Profile load failed');
			return;
		}

		const before = table.clone(profile.Data);
		profile.Reconcile();
		const after = profile.Data;

		for (const [key, value] of pairs(after as Map<keyof T, defined>)) {
			if (before[key] !== value) {
				Log.Info('Reconciled {Key} for {Player}: {Before} → {After}', key, player.Name, before[key], value);
			}
		}

		profile.AddUserId(player.UserId);

		profile.OnSessionEnd.Connect(() => {
			Log.Warn('Session ended for {Player}', player.Name);
			this.profiles.delete(player);
			this.onSessionEnd?.(player);
			player.Kick('Session ended');
		});

		if (player.Parent === game.GetService('Players')) {
			this.profiles.set(player, profile);
			this.onLoad?.(player, profile);
			Log.Info('Properly loaded "{Store}" profile for {Player}', this.name, player.Name);
		} else {
			profile.EndSession();
		}
	}

	public detach(player: Player): void {
		Log.Debug('Detaching profile for {Player}', player.Name);

		const profile = this.profiles.get(player);
		if (profile) {
			profile.EndSession();
			this.profiles.delete(player);
		}
	}

	public get(player: Player): Profile<T> | undefined {
		return this.profiles.get(player);
	}
}
