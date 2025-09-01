import { Controller, OnInit } from '@flamework/core';
import { Logger } from '@rbxts/log';
import { SoundService } from '@rbxts/services';
import { createInstance } from 'shared/utils/instance';
import { SoundType } from '../constants/sound';

@Controller()
export class SoundController implements OnInit {
	private soundGroups: Map<SoundType, SoundGroup> = new Map();

	constructor(private readonly logger: Logger) {}

	public onInit(): void | Promise<void> {
		this.makeSoundGroup(SoundType.Music);
		this.makeSoundGroup(SoundType.SoundEffect);

		this.logger.Info('{NumSoundGroups} sound group(s) created', this.soundGroups.size());
	}

	private makeSoundGroup(soundType: SoundType): SoundGroup {
		const existingSoundGroup = SoundService.FindFirstChild(soundType);
		if (existingSoundGroup?.IsA('SoundGroup')) {
			return existingSoundGroup;
		}

		const soundGroup = createInstance('SoundGroup', {
			Name: soundType,
			Volume: 1,
			Parent: SoundService,
		});

		this.soundGroups.set(soundType, soundGroup);
		return soundGroup;
	}
}
