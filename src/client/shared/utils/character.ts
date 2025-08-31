import { Players } from "@rbxts/services";
import { Character } from "shared/types/character";
import { isCharacterModel } from "shared/utils/character";

export function getCharacter(): Character | undefined {
    const character = Players.LocalPlayer.Character;
    if (!(character && isCharacterModel(character))) {
        return undefined;
    }
    return character;
}