export type InputContext = string;

export interface InputActionBinding {
	name: string;
	keys: Enum.KeyCode[];
	callback: (input: InputObject, gameProcessed: boolean) => void;
	context?: string;
	consumeInput?: boolean;
}
