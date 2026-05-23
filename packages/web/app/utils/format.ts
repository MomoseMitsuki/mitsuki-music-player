export const formatTime = (time: number): string => {
	time = Math.floor(time);
	const mins = Math.floor(time / 60);
	const seconds = time - mins * 60;
	const minsStr = mins > 9 ? `${mins}` : `0${mins}`;
	const secondsStr = seconds > 9 ? `${seconds}` : `0${seconds}`;
	return minsStr + ":" + secondsStr;
};

export const formatDate = (time: number): string => {
	const date = new Date(time).toLocaleString();
	const format = date.split(" ")[0]!.replaceAll("/", "-");
	return format;
};

export function formatTimeAgo(timestamp: number): string {
	const now = Date.now();
	const diff = now - timestamp;

	if (diff < 1000) {
		return "刚刚";
	}

	const seconds = Math.floor(diff / 1000);

	if (seconds < 60) {
		return `${seconds}秒前`;
	}

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes}分钟前`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours}小时前`;
	}

	const days = Math.floor(hours / 24);
	if (days < 30) {
		return `${days}天前`;
	}

	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months}月前`;
	}

	const years = Math.floor(days / 365);
	return `${years}年前`;
}
const _parseTime = (timeStr: string) => {
	const parts = timeStr.split(":");
	return +parts[0]! * 60 + +parts[1]!;
};

const _deleteSpace = (arr: Array<LyricLine>) => {
	if (!Array.isArray(arr) || arr.length === 0) return arr;
	const result: Array<LyricLine> = [];
	for (let i = 0; i < arr.length; i++) {
		const curr = arr[i];
		const prev = result.length > 0 ? result[result.length - 1] : null;
		if (
			prev &&
			curr!.time - prev.time < 3 &&
			(!prev.words || prev.words.trim() === "")
		) {
			result.pop();
		}
		result.push(curr!);
	}
	return result;
};

export const formatLyric = (lyricStr: string) => {
	const lyricData = lyricStr.split("\r\n\r\n");
	const lines = lyricData[1]!.split("\r\n");
	const result: Array<LyricLine> = [];
	for (let i = 0; i < lines.length; i++) {
		const str = lines[i]!;
		const parts = str.split("]");
		const timeStr = parts[0]!.substring(1);
		const obj: LyricLine = {
			time: _parseTime(timeStr),
			words: parts[1]!
		};
		result.push(obj);
	}
	return _deleteSpace(result);
};
