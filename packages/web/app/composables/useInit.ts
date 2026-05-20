import localforage from "localforage";

const VOLUMEKEY = "volume";
const MODEKEY = "mode";
const QUEUEKEY = "defaultQueue";

const debounceSetVolume = debounce((value: number) => {
	localforage.setItem(VOLUMEKEY, value);
});

const debounceSetMode = debounce((mode: number) => {
	localforage.setItem(MODEKEY, mode);
});

const debounceSetQueue = debounce((queue: Array<Music>) => {
	localforage.setItem(QUEUEKEY, toRaw(queue));
});

export async function useInit() {
	// 本地读取 播放队列 音量 播放模式
	const audioStore = useAudioStore();
	const queueStore = useQueueStore();

	const { reactiveInfo } = storeToRefs(audioStore);
	const { queue, mode } = storeToRefs(queueStore);

	queue.value = await getInitData<Array<Music>>(QUEUEKEY, []);
	mode.value = await getInitData<number>(MODEKEY, 0);
	reactiveInfo.value.volume = await getInitData<number>(VOLUMEKEY, 100);

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
