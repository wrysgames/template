import { Controller, OnInit } from '@flamework/core';
import { Logger } from '@rbxts/log';
import { SoundService } from '@rbxts/services';
import { makeInstance } from 'shared/utils/instance';
import { SoundType } from '../constants/sound';

interface SoundSettings {
	attachPoint?: Instance;
	soundType: SoundType;
	properties?: Omit<Partial<WritableInstanceProperties<Sound>>, 'Parent'>;
}

@Controller()
export class SoundController implements OnInit {
	private soundGroups: Map<SoundType, SoundGroup> = new Map();

	constructor(private readonly logger: Logger) {}

	public onInit(): void | Promise<void> {
		this.makeSoundGroup(SoundType.Music);
		this.makeSoundGroup(SoundType.SoundEffect);

		this.logger.Info('{NumSoundGroups} sound group(s) created', this.soundGroups.size());
	}

	public createSound(soundId: string, { soundType, attachPoint, properties }: SoundSettings): Sound {
		const soundGroup = this.soundGroups.get(soundType);
		assert(soundGroup, 'Sound group "%s" does not exist'.format(soundType));

		const parent = attachPoint ?? soundGroup;
		const soundObject = makeInstance('Sound', {
			...properties,
			Parent: parent,
			SoundId: soundId,
			SoundGroup: soundGroup,
		});

		this.logger.Verbose('Created a sound {Id} of type {SoundType}', soundId, soundType);

		return soundObject;
	}

	public playSound(sound: Sound): void {
		sound.Play();
	}

	private makeSoundGroup(soundType: SoundType): SoundGroup {
		const existingSoundGroup = SoundService.FindFirstChild(soundType);
		if (existingSoundGroup?.IsA('SoundGroup')) {
			return existingSoundGroup;
		}

		const soundGroup = makeInstance('SoundGroup', {
			Name: soundType,
			Volume: 1,
			Parent: SoundService,
		});

		this.soundGroups.set(soundType, soundGroup);
		return soundGroup;
	}
}
