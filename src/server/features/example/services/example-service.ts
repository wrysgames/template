import { OnInit, Service } from '@flamework/core';
import { Logger } from '@rbxts/log';
import example from 'shared/networking/example';

@Service()
export class ExampleService implements OnInit {
	constructor(private readonly logger: Logger) {}

	public onInit(): void | Promise<void> {
		example.test.listen(({ id }) => {
			this.logger.Debug('Received message {message}', id);
		});
	}
}
