import { Character } from 'shared/types/character';
import { getDescendantsFromTypedPath } from './finder/finder';

export function isCharacterModel(character: Instance): character is Character {
	try {
		getDescendantsFromTypedPath(
			character,
			['Humanoid@Humanoid/Animator@Animator', 'HumanoidRootPart@BasePart/RootAttachment@Attachment'],
			{
				throwOnMissing: true,
				throwOnTypeMismatch: true,
			},
		);

		return true;
	} catch {
		return false;
	}
}
