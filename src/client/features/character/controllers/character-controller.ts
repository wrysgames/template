import { Controller, OnInit } from '@flamework/core';
import type { Logger } from '@rbxts/log';
import { Players } from '@rbxts/services';
import { promiseTree } from '@rbxts/validate-tree';
import { ClientAnimationFactory } from 'client/shared/utils/client-animation/factory';
import { Character } from 'shared/types/character';
import {
	CHARACTER_LOAD_TIMEOUT,
	isCharacterModel,
	onCharacterAdded,
	onCharacterRemoving,
} from 'shared/utils/character';
import { characterSchema } from 'shared/utils/character/schema';

@Controller()
export class CharacterController implements OnInit {
	private character?: Character;

	constructor(private readonly logger: Logger) {}

	public onInit(): void | Promise<void> {
		onCharacterAdded(Players.LocalPlayer, (character) => {
			this.characterAdded(character);
		});

		onCharacterRemoving(Players.LocalPlayer, (character) => {
			if (isCharacterModel(character)) {
				this.logger.Debug('Character "{Character}" is being cleaned up', character.Name);
				// delete character animator
				ClientAnimationFactory.deleteManager(character);
			}
		});
	}

	public getCharacter(): Character | undefined {
		return this.character;
	}

	private async characterAdded(model: Model): Promise<void> {
		const promise = promiseTree(model, characterSchema);

		const timeout = task.delay(CHARACTER_LOAD_TIMEOUT, () => {
			promise.cancel();
		});

		const connection = model.AncestryChanged.Connect(() => {
			if (model.IsDescendantOf(game)) {
				return;
			}

			promise.cancel();
		});

		const [success, rig] = promise.await();
		task.cancel(timeout);
		connection.Disconnect();

		if (!success) {
			this.logger.Fatal('Character failed to load');
			throw 'Character failed to load';
		}

		this.listenForCharacterRemoving(model);
		this.onRigLoaded(rig);
	}

	private listenForCharacterRemoving(character: Model): void {
		const connection = character.AncestryChanged.Connect(() => {
			if (character.IsDescendantOf(game)) {
				return;
			}

			this.logger.Verbose('Character has been removed');

			connection.Disconnect();
			this.character = undefined;
		});
	}

	private onRigLoaded(rig: Character): void {
		this.logger.Debug('Loaded character rig');
		this.character = rig;
	}
}
