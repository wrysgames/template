import { Stringifiable } from 'shared/types/globals';
import { average } from '../array/number';

export class ProfilerSummary implements Stringifiable {
	public averageTimeInMilliseconds: number;

	constructor(ticks: number[]) {
		this.averageTimeInMilliseconds = average(ticks) * 1000;
	}

	public toString(): string {
		return `averageTimeInMilliseconds: ${this.averageTimeInMilliseconds}\n`;
	}
}
