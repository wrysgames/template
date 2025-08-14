import { Profiler } from ".";

export class ProfilerFactory {
    private static profilers: Map<string, Profiler> = new Map();

    public static createProfiler(key: string): Profiler {
        const profiler = this.profilers.get(key);
        if (profiler) {
            return profiler;
        }
        else {
            const newProfiler = new Profiler();
            this.profilers.set(key, newProfiler);
            return newProfiler;
        }
    }

    public static deleteProfiler(key: string): void {
        this.profilers.delete(key);
    }
}