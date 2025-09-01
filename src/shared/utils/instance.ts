type GetBindableToRBXScriptSignal<T> = {
	[key in {
		[K in keyof T]-?: T[K] extends RBXScriptSignal ? K : never;
	}[keyof T]]: T[key] extends RBXScriptSignal<infer R> ? R : never;
};

type GetPartialObjectWithBindableConnectSlots<T extends Instance> = Partial<
	GetBindableToRBXScriptSignal<T> & Pick<T, WritablePropertyNames<T>>
>;

export function makeInstance<
	T extends keyof CreatableInstances,
	Q extends {
		Children?: ReadonlyArray<Instance>;
		Parent?: Instance;
	} & Partial<GetPartialObjectWithBindableConnectSlots<CreatableInstances[T]>>,
>(className: T, properties: Q): CreatableInstances[T] {
	const { Children: children, Parent: parent } = properties;

	const instance = new Instance(className);
	let propertyRecord = properties as unknown as Map<never, never>;
	for (const [key, val] of pairs(propertyRecord)) {
		const { [key]: property } = instance;
		if (typeIs(property, 'RBXScriptSignal')) {
			(property as RBXScriptSignal).Connect(val);
		} else {
			instance[key] = val;
		}
	}

	instance.Parent = parent;
	if (children) {
		for (const child of children) {
			child.Parent = instance;
		}
	}

	return instance;
}
