import InputManager from '@client/input-manager';

const manager = InputManager.getInstance();
manager.bindAction({
    name: "test",
    callback: () => {
        print('button pressed');
    },
    keys: [Enum.KeyCode.A]
})