import { Character } from 'shared/types/character';

export class ClientAnimationManager {
	private animations: Map<string, Animation> = new Map();

	constructor(private character: Character) {}

	public loadAnimation(animationId: string): AnimationTrack {
		const animation = this.animations.get(animationId);
		if (!animation) {
			const newAnimation = new Instance('Animation');
			newAnimation.AnimationId = animationId;
			return this.character.Humanoid.Animator.LoadAnimation(newAnimation);
		}
		return this.character.Humanoid.Animator.LoadAnimation(animation);
	}
}
