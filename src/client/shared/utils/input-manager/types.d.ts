export type InputContext = string;

export interface InputActionBinding {
	name: string;

	keys?: Enum.KeyCode[];
	inputTypes?: Enum.UserInputType[];

	callback: (inputObject: InputObject, gameProcessed: boolean) => void;

	context?: InputContext;
	consumeInput?: boolean;
	priority?: number;
}