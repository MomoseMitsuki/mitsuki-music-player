// eslint-disable-next-line @typescript-eslint/no-unused-vars
const eventNames = [
	"MUSIC:PLAY",
	"MUSIC:END",
	"MUSIC:TIMEUPDATE",
	"VIDEO:PLAY"
] as const;
type EventNames = (typeof eventNames)[number];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => void;

class EventEmitter<T extends string> {
	public events: Map<T, Set<Func>>;
	constructor() {
		this.events = new Map();
	}
	on(event: T, listener: Func) {
		if (!this.events.has(event)) {
			this.events.set(event, new Set());
		}
		this.events.get(event)!.add(listener);
	}
	emit(event: T, ...args: unknown[]) {
		if (!this.events.has(event)) {
			return;
		}
		for (const listener of this.events.get(event)!) {
			listener(...args);
		}
	}
	off(event: T, listener: Func) {
		if (!this.events.has(event)) {
			return;
		}
		this.events.get(event)!.delete(listener);
	}
	once(event: T, listener: Func) {
		const onceListener = (...args: unknown[]) => {
			listener(...args);
			this.off(event, onceListener);
		};
		this.on(event, onceListener);
	}
}

export const eventEmitter = new EventEmitter<EventNames>();
