export type InputContext = string;

export class InputManager {
    private static instance: InputManager | undefined;

    private constructor() {
        // Logic here
    }

    public static getInstance(): InputManager {
        if (!this.instance) {
            this.instance = new InputManager();
        }
        return this.instance;
    }
}