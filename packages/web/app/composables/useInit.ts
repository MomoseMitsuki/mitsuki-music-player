import localforage from "localforage";

const VOLUME_KEY = "volume";
const MODE_KEY = "mode";
const QUEUE_KEY = "defaultQueue";
const RECENT_QUEUE_KEY = "recentQueue";
const PLAY_INDEX_KEY = "playIndex";

const debounceSetVolume = debounce((value: number) => {
	localforage.setItem(VOLUME_KEY, value);
});

const debounceSetMode = debounce((mode: number) => {
	localforage.setItem(MODE_KEY, mode);
});

const debounceSetQueue = debounce((queue: Array<Music>) => {
	localforage.setItem(QUEUE_KEY, toRaw(queue));
});

const debounceSetRecentQueue = debounce((queue: Array<Music>) => {
	localforage.setItem(RECENT_QUEUE_KEY, toRaw(queue));
});

const debounceSetPlayIndex = debounce((index: number) => {
	localforage.setItem(PLAY_INDEX_KEY, index);
});

export async function useInit() {
	// 本地读取: 播放队列 播放位置 最近播放 音量 播放模式
	const audioStore = useAudioStore();
	const queueStore = useQueueStore();

	const { selectMusic } = queueStore;
	const { reactiveInfo } = storeToRefs(audioStore);
	const { queue, recentQueue, mode, playIndex } = storeToRefs(queueStore);

	queue.value = await getInitData<Array<Music>>(QUEUE_KEY, []);
	recentQueue.value = await getInitData<Array<Music>>(RECENT_QUEUE_KEY, []);
	mode.value = await getInitData<number>(MODE_KEY, 0);
	reactiveInfo.value.volume = await getInitData<number>(VOLUME_KEY, 100);
	playIndex.value = await getInitData<number>(PLAY_INDEX_KEY, -1);

	// playIndex 越界
	if (playIndex.value >= queue.value.length) {
		playIndex.value = queue.value.length - 1;
	}
	if (playIndex.value !== -1) {
		selectMusic(playIndex.value);
	}

	watch(playIndex, debounceSetPlayIndex);
	watch(() => reactiveInfo.value.volume, debounceSetVolume);
	watch(mode, debounceSetMode);
	watch(queue, debounceSetQueue, { deep: true });
	watch(recentQueue, debounceSetRecentQueue, { deep: true });
}

async function getInitData<T = unknown>(key: string, defaultValue: T) {
	const value = await localforage.getItem<T>(key);
	if (value === null) {
		await localforage.setItem(key, defaultValue);
		return defaultValue;
	} else {
		return value;
	}
}
