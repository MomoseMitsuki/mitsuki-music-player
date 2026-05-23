import { defineStore } from "pinia";
import { eventEmitter } from "@/utils";

const FFTSIZE = 128;
interface AudioState {
	name: string;
	singers?: string;
	avatar?: string;
	src: string;
	paused: boolean;
	currentTime: number;
	duration: number;
	volume: number;
	lyricId: string;
}
const EMPTY_DATA: AudioState = {
	name: "花逢坂町",
	singers: void 0,
	avatar: "",
	src: "",
	paused: true,
	currentTime: 0,
	duration: 0,
	volume: 100,
	lyricId: ""
};

export const useAudioStore = defineStore("audioStore", () => {
	const isInit = ref(false);
	let audioInstance: HTMLAudioElement | null = null;
	const analyser: Ref<AnalyserNode | null> = ref(null);
	const dataArray: Ref<Uint8Array<ArrayBuffer> | null> = ref(null);

	const reactiveInfo = ref({ ...EMPTY_DATA });

	const isDragProgress = ref(false);

	function ensureAudio(): HTMLAudioElement {
		if (import.meta.server) {
			throw new Error("Audio 只能在客户端使用");
		}
		if (!audioInstance) {
			audioInstance = new Audio();
			audioInstance.addEventListener("play", () => {
				reactiveInfo.value.paused = false;

				eventEmitter.emit("MUSIC:PLAY");

				if (isInit.value) return;
				isInit.value = true;

				const audCtx = new AudioContext();
				const source = audCtx.createMediaElementSource(audioInstance!);
				analyser.value = audCtx.createAnalyser();
				analyser.value.fftSize = FFTSIZE;
				dataArray.value = new Uint8Array(
					analyser.value.frequencyBinCount
				);
				source.connect(analyser.value);
				analyser.value.connect(audCtx.destination);
			});
			audioInstance.addEventListener("pause", () => {
				reactiveInfo.value.paused = true;
			});
			audioInstance.addEventListener("ended", () => {
				eventEmitter.emit("MUSIC:END");
			});
			audioInstance.addEventListener("timeupdate", () => {
				if (isDragProgress.value) return;
				reactiveInfo.value.currentTime = audioInstance!.currentTime;
				eventEmitter.emit(
					"MUSIC:TIMEUPDATE",
					audioInstance!.currentTime
				);
			});
			audioInstance.addEventListener("loadedmetadata", () => {
				reactiveInfo.value.duration = audioInstance!.duration;
			});
		}
		return audioInstance;
	}

	function setAudio(music: Music) {
		const audio = ensureAudio();
		audio.src = music.src;
		reactiveInfo.value.name = music.name;
		reactiveInfo.value.singers = music.singers;
		reactiveInfo.value.avatar = music.avatar;
		ensureAudio().volume = reactiveInfo.value.volume / 100;
		reactiveInfo.value.src = music.src;
		ensureAudio().currentTime = 0;
		reactiveInfo.value.currentTime = 0;
		reactiveInfo.value.lyricId = music.lyricId;
	}

	function setVolume() {
		ensureAudio().volume = reactiveInfo.value.volume / 100;
	}

	function emptyAudio() {
		pause();
		reactiveInfo.value = { ...EMPTY_DATA };
		ensureAudio().currentTime = 0;
		ensureAudio().src = "";
	}

	function setCurrentTime(time: number) {
		ensureAudio().currentTime = time;
		reactiveInfo.value.currentTime = time;
	}

	function play() {
		if (!reactiveInfo.value.src) return;
		ensureAudio().play();
	}

	function pause() {
		if (!reactiveInfo.value.src) return;
		ensureAudio().pause();
	}

	return {
		reactiveInfo,
		isDragProgress,
		isInit,
		analyser,
		dataArray,

		ensureAudio,
		setCurrentTime,
		setVolume,
		setAudio,
		emptyAudio,
		play,
		pause
	};
});
