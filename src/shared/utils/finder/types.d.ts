export interface FinderOptions {
	pathDelimiter?: string;
	classDelimiter?: string;
	throwOnMissing?: boolean;
	throwOnTypeMismatch?: boolean;
	onNodeFound?: (node: Instance, segment: string) => void;
}
