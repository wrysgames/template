import { Character } from 'shared/types/character';
import { ClientAnimationManager } from '.';

export class ClientAnimationFactory {
	private static characters: Map<Character, ClientAnimationManager> = new Map();
	private constructor() {}

	public static getManager(character: Character): ClientAnimationManager {
		const manager = this.characters.get(character);
		if (!manager) {
			const newManager = new ClientAnimationManager(character);
			this.characters.set(character, newManager);
			return newManager;
		}
		return manager;
	}

	public static deleteManager(character: Character): void {
		this.characters.delete(character);
	}
}
