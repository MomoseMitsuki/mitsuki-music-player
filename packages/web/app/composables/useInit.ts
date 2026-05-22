import localforage from "localforage";

const VOLUMEKEY = "volume";
const MODEKEY = "mode";
const QUEUEKEY = "defaultQueue";
const PLAYINDEXKEY = "playIndex";

const debounceSetVolume = debounce((value: number) => {
	localforage.setItem(VOLUMEKEY, value);
});

const debounceSetMode = debounce((mode: number) => {
	localforage.setItem(MODEKEY, mode);
});

const debounceSetQueue = debounce((queue: Array<Music>) => {
	localforage.setItem(QUEUEKEY, toRaw(queue));
});

const debounceSetPlayIndex = debounce((index: number) => {
	localforage.setItem(PLAYINDEXKEY, index);
});

export async function useInit() {
	// 本地读取 播放队列 音量 播放模式
	const audioStore = useAudioStore();
	const queueStore = useQueueStore();

	const { selectMusic } = queueStore;
	const { reactiveInfo } = storeToRefs(audioStore);
	const { queue, mode, playIndex } = storeToRefs(queueStore);

	queue.value = await getInitData<Array<Music>>(QUEUEKEY, []);
	mode.value = await getInitData<number>(MODEKEY, 0);
	reactiveInfo.value.volume = await getInitData<number>(VOLUMEKEY, 100);
	playIndex.value = await getInitData<number>(PLAYINDEXKEY, -1);

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
	watch(queue, debounceSetQueue);
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
