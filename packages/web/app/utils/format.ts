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
