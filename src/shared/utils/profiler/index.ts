import { ProfilerSummary } from './summary';

const MAX_TICKS = 100;

export class Profiler {
	private isRunning: boolean = false;
	private lastTick: number = 0;
	private ticks: number[] = [];

	public tic(): void {
		if (this.isRunning) {
			return;
		}

		this.isRunning = true;
		this.lastTick = os.clock();
	}

	public tok(): number {
		if (!this.isRunning) {
			return -1;
		}

		const currentTick = os.clock();
		if (this.ticks.size() >= MAX_TICKS) {
			// Wrap around to the 1st index
			this.ticks.shift();
		}

		const timeElapsed = currentTick - this.lastTick;

		this.ticks.push(timeElapsed * 1000); // convert to milliseconds
		this.isRunning = false;

		return timeElapsed;
	}

	public generateSummary(): ProfilerSummary {
		return new ProfilerSummary(this.ticks);
	}
}
