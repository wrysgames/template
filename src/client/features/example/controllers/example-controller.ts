import { Controller, OnStart } from '@flamework/core';
import inputManager from 'client/shared/utils/input-manager';
import example from 'shared/networking/example';

@Controller()
export class ExampleController implements OnStart {
	public onStart(): void {
		inputManager.bindAction({
			name: 'example',
			keys: [Enum.KeyCode.E],
			callback: () => {
				example.test.send({
					id: 'Hello world!',
				});
			},
		});
	}
}
