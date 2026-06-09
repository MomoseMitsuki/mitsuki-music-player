// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay = 500
) {
	let timer: NodeJS.Timeout | undefined = void 0;
	return function (...args: Parameters<T>) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}

export function randomNum(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isInList(music: Music, list: Array<Music>): number {
	for (const [index, item] of Object.entries(list)) {
		if (music.id === item.id) {
			return Number(index);
		}
	}
	return -1;
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
	return typeof obj === "object" && obj !== null;
}
