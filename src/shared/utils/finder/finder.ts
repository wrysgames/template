import { FinderOptions } from './types';

type RobloxClassName = keyof Objects;

const defaultClassDelimiter = '@';
const defaultPathDelimiter = '/';

export function typedPath(
	name: string,
	className?: RobloxClassName,
	classDelimiter: string = defaultClassDelimiter,
): string {
	return className ? `${name}${classDelimiter}${className}` : name;
}

export function getDescendantFromTypedPath<T extends Instance>(
	parent: Instance,
	path: string,
	options?: FinderOptions,
): T | undefined;
export function getDescendantFromTypedPath<T extends Instance>(
	parent: Instance,
	path: string[],
	options?: FinderOptions,
): T | undefined;
export function getDescendantFromTypedPath<T extends Instance>(
	parent: Instance,
	path: string | string[],
	options?: FinderOptions,
): T | undefined {
	const pathDelimiter = options?.pathDelimiter ?? defaultPathDelimiter;
	const classDelimiter = options?.classDelimiter ?? defaultClassDelimiter;

	const segments = typeIs(path, 'string') ? path.split(pathDelimiter) : path;
	let current = parent;
	for (const segment of segments) {
		const [name, className] = segment.split(classDelimiter);
		if (!name) {
			if (options?.throwOnMissing) throw `Missing name in path segment: ${segment}`;
			return undefined;
		}
		const child = current.FindFirstChild(name);
		if (!child) {
			if (options?.throwOnMissing) throw `Could not find child: ${name}`;
			return undefined;
		}
		if (className && !child.IsA(className as keyof Objects)) {
			if (options?.throwOnTypeMismatch) throw `Type mismatch: ${name} is not a ${className}`;
			return undefined;
		}
		current = child;
		if (options?.onNodeFound) {
			options.onNodeFound(child, segment);
		}
	}
	return current as T;
}

export function getDescendantsFromTypedPath<T extends Instance>(
	parent: Instance,
	paths: (string | string[])[],
	options?: FinderOptions,
): (T | undefined)[] {
	return paths.map((path) => {
		if (typeIs(path, 'string')) {
			return getDescendantFromTypedPath<T>(parent, path, options);
		} else {
			return getDescendantFromTypedPath<T>(parent, path, options);
		}
	});
}
