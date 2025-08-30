export function sumArray(array: number[]): number {
	return array.reduce((accumulator, current) => accumulator + current);
}

export function average(array: number[]): number {
	const size = array.size();
	if (size === 0) {
		return 0;
	} else {
		return sumArray(array) / size;
	}
}
