import { UserInputService } from '@rbxts/services';
import { InputActionBinding } from 'types';

class InputManager {
	private static singleton: InputManager | undefined;
	private bindings: Map<string, InputActionBinding[]> = new Map();
	private currentContext: string = 'Game';

	private constructor() {
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) return;

			for (const [_, bindings] of this.bindings) {
				for (const binding of bindings) {
					if (
						(binding.context === undefined || binding.context === this.currentContext) &&
						binding.keys.includes(input.KeyCode)
					) {
						binding.callback(input, gameProcessed);
						if (binding.consumeInput) return;
					}
				}
			}
		});
	}

	public static getInstance(): InputManager {
		if (!this.singleton) {
			this.singleton = new InputManager();
		}
		return this.singleton;
	}

	public bindAction(binding: InputActionBinding): void {
		if (!this.bindings.has(binding.name)) {
			this.bindings.set(binding.name, []);
		}
		this.bindings.get(binding.name)?.push(binding);
	}

	public unbindAction(bindingName: string): void {
		this.bindings.delete(bindingName);
	}

	public setContext(context: string): void {
		this.currentContext = context;
	}

	public clearAll(): void {
		this.bindings.clear();
	}
}

export = InputManager;
