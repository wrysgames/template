import { Controller, OnInit } from '@flamework/core';
import { Players } from '@rbxts/services';
import { ClientAnimationFactory } from 'client/shared/utils/client-animation/factory';
import { isCharacterModel } from 'shared/utils/character';

@Controller()
export class CharacterController implements OnInit {
	public onInit(): void | Promise<void> {
		Players.LocalPlayer.CharacterRemoving.Connect((character) => {
			if (isCharacterModel(character)) {
				// delete character animator
				ClientAnimationFactory.deleteManager(character);
			}
		});
	}
}
