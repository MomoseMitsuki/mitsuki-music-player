import { defineStore } from "pinia";
import { eventEmitter } from "@/utils";
import { useAudioStore } from "#imports";

export const useQueueStore = defineStore("queueStore", () => {
	const audioStore = useAudioStore();
	const { setCurrentTime, setAudio, emptyAudio, pause, play } = audioStore;

	const queue = ref<Array<Music>>([]);
	const mode = ref(0);
	const playIndex = ref(-1);

	function changeMode() {
		mode.value = (mode.value + 1) % 5;
	}

	function playMusic(index: number) {
		playIndex.value = index;
		setAudio(queue.value[index]!);
	}

	function playPrev() {
		if (playIndex.value === 0 || playIndex.value === -1) {
			playIndex.value = queue.value.length - 1;
		} else {
			playIndex.value--;
		}
		playMusic(playIndex.value);
	}

	function playNext() {
		if (playIndex.value === queue.value.length - 1) {
			playIndex.value = 0;
		} else {
			playIndex.value++;
		}
		playMusic(playIndex.value);
	}

	function addMusic(music: Music) {
		for (const [index, item] of Object.entries(queue.value)) {
			if (item.id === music.id) {
				playMusic(Number(index));
				return;
			}
		}
		queue.value.push(music);
		playMusic(queue.value.length - 1);
	}

	function deleteMusic(index: number) {
		if (queue.value.length === 1) {
			pause();
			setCurrentTime(0);
			queue.value = [];
			emptyAudio();
			return;
		}
		if (playIndex.value > index) {
			playIndex.value--;
		} else if (playIndex.value === index) {
			eventEmitter.emit("MUSIC:END");
			playIndex.value = index;
		}
		queue.value.splice(index, 1);
	}

	function playLists(lists: Array<Music>) {
		queue.value = lists;
		playMusic(0);
	}

	eventEmitter.on("MUSIC:END", () => {
		setCurrentTime(0);
		switch (mode.value) {
			case 0:
				// 顺序播放
				if (playIndex.value === queue.value.length - 1) {
					emptyAudio();
					return;
				}
				playIndex.value++;
				playMusic(playIndex.value);
				break;
			case 1:
				// 列表循环
				if (playIndex.value === queue.value.length - 1) {
					playIndex.value = 0;
					playMusic(0);
					return;
				}
				playIndex.value++;
				playMusic(playIndex.value);
				break;
			case 2:
				// 随机播放
				playIndex.value = Math.floor(
					Math.random() * queue.value.length
				);
				playMusic(playIndex.value);
				break;
			case 3:
				// 单曲循环
				setCurrentTime(0);
				play();
				break;
			case 4:
				// 单曲播放
				emptyAudio();
				playIndex.value = -1;
				break;
			default:
				throw new Error("未知的模式");
		}
	});

	return {
		queue,
		mode,
		playIndex,

		changeMode,
		addMusic,
		deleteMusic,
		playLists,
		playMusic,
		playPrev,
		playNext
	};
});
