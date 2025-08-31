import { UserInputService } from '@rbxts/services';
import { InputActionBinding } from './types';

const DEFAULT_PRIORITY = 999;

class InputManager {
	private readonly bindings: Map<string, InputActionBinding[]> = new Map();
	private currentContext: string = 'Game';

	constructor() {
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) return;

			for (let [_, bindings] of this.bindings) {
				// sort based on priority
				bindings = bindings.sort((a, b) => {
					return (a.priority ?? DEFAULT_PRIORITY) < (b.priority ?? DEFAULT_PRIORITY);
				});
				for (const binding of bindings) {
					const matchesKey = binding.keys && binding.keys.includes(input.KeyCode);
					const matchesInputType = binding.inputTypes && binding.inputTypes.includes(input.UserInputType);
					const matchesContext = binding.context === undefined || binding.context === this.currentContext;

					if (matchesContext && (matchesKey || matchesInputType)) {
						binding.callback(input, gameProcessed);
						if (binding.consumeInput) return;
					}
				}
			}
		});
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

export = new InputManager();
