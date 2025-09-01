import { validateTree } from '@rbxts/validate-tree';
import { Character } from 'shared/types/character';
import { characterSchema } from './schema';

export const CHARACTER_LOAD_TIMEOUT = 10;

export function isCharacterModel(character: Instance): character is Character {
	return validateTree(character, characterSchema);
}

export function cleanupCharacter(player: Player): void {
	if (!player.Character) {
		return;
	}

	player.Character.Destroy();
	player.Character = undefined;
}

export async function loadCharacter(player: Player): Promise<void> {
	await Promise.race<unknown>([
		Promise.try(() => {
			cleanupCharacter(player);
			player.LoadCharacter();
		}),
		Promise.delay(CHARACTER_LOAD_TIMEOUT),
	]);
}

export function onCharacterAdded(player: Player, callback: (character: Model) => void): RBXScriptConnection {
	return player.CharacterAdded.Connect((character) => callback(character));
}

export function onCharacterRemoving(player: Player, callback: (character: Model) => void): RBXScriptConnection {
	return player.CharacterRemoving.Connect((character) => callback(character));
}
