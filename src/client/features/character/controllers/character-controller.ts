import { Controller, OnInit } from '@flamework/core';
import type { Logger } from '@rbxts/log';
import { Players } from '@rbxts/services';
import { ClientAnimationFactory } from 'client/shared/utils/client-animation/factory';
import { isCharacterModel } from 'shared/utils/character';

@Controller()
export class CharacterController implements OnInit {
	constructor(private readonly logger: Logger) {}

	public onInit(): void | Promise<void> {
		Players.LocalPlayer.CharacterRemoving.Connect((character) => {
			if (isCharacterModel(character)) {
				this.logger.Fatal('Character {Character} is being cleaned up', character.Name);
				// delete character animator
				ClientAnimationFactory.deleteManager(character);
			}
		});
	}
}
