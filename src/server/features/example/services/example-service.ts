import { OnInit, Service } from '@flamework/core';
import example from 'shared/networking/example';

@Service()
export class ExampleService implements OnInit {
	public onInit(): void | Promise<void> {
		example.test.listen(({ id }) => {
			print(id);
		});
	}
}
