<script lang="ts" setup>
import LyricView from "./LyricView.vue";
import PlayQueue from "./PlayQueue.vue";

const audioStore = useAudioStore();
const queueStore = useQueueStore();
const userStore = useUserStore();

const { play, pause, ensureAudio, setVolume } = audioStore;
const { changeMode, playPrev, playNext } = queueStore;
const { isMusicInFavorite, addMusicToFavorite, deleteMusicFromFavorite } =
	userStore;

const { reactiveInfo, isDragProgress } = storeToRefs(audioStore);
const { queue, mode, playIndex } = storeToRefs(queueStore);

const isOpenLyric = ref(false);

function changeOpenLyric() {
	isOpenLyric.value = !isOpenLyric.value;
}

eventEmitter.on("VIDEO:PLAY", () => (isOpenLyric.value = false));

const startDragMusicProgress = () => {
	isDragProgress.value = true;
};

const endDragMusicProgress = () => {
	isDragProgress.value = false;
	ensureAudio().currentTime = reactiveInfo.value.currentTime;
};
</script>

<template>
	<n-flex class="music__container" align="center">
		<div class="avatar__container" @click="changeOpenLyric">
			<div class="cover">
				<svg
					:class="{ lyric: isOpenLyric }"
					viewBox="0 0 1024 1024"
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
				>
					<path
						d="M231.5 577.4L512 296.9l280.5 280.5c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.7-11.7 11.7-30.7 0-42.4L533.2 233.2c-11.7-11.7-30.7-11.7-42.4 0L189 535c-11.7 11.7-11.7 30.7 0 42.4 11.8 11.7 30.8 11.7 42.5 0zM835 748.3L533.2 446.6c-11.7-11.7-30.7-11.7-42.4 0L189 748.3c-11.7 11.7-11.7 30.7 0 42.4s30.7 11.7 42.4 0L512 510.2l280.5 280.5c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.8-11.7 11.8-30.7 0.1-42.4z"
					></path>
				</svg>
			</div>
			<NuxtImg
				:src="
					reactiveInfo.avatar
						? reactiveInfo.avatar
						: '/images/default_music_avatar.webp'
				"
				placeholder="/images/default_music_avatar.webp"
				fallback="/images/default_music_avatar.webp"
				width="50"
				height="50"
				fit="cover"
			></NuxtImg>
		</div>
		<div class="music__info">
			<div v-marquee="reactiveInfo.name" class="name">
				{{ reactiveInfo.name }}
			</div>
			<div class="singers">
				{{ reactiveInfo.singers ? reactiveInfo.singers : "未知" }}
			</div>
		</div>
		<Icon
			v-if="!isMusicInFavorite(queue[playIndex]!)"
			name="mdi:cards-heart-outline"
			:size="24"
			class="heart hover"
			@click="() => addMusicToFavorite(queue[playIndex]!)"
		></Icon>
		<Icon
			v-else
			name="mdi:cards-heart"
			:size="24"
			class="heart hover primary"
			@click="() => deleteMusicFromFavorite(queue[playIndex]!)"
		></Icon>

		<Icon
			name="mdi:skip-previous"
			:size="30"
			class="hover"
			@click="playPrev"
		></Icon>

		<div v-if="reactiveInfo.paused" class="play-btn hover" @click="play">
			<Icon name="mdi:play" :size="20"></Icon>
		</div>
		<div v-else class="play-btn hover" @click="pause">
			<Icon name="mdi:pause" :size="20"></Icon>
		</div>

		<Icon
			name="mdi:skip-next"
			:size="30"
			class="hover"
			@click="playNext"
		></Icon>

		<n-slider
			v-model:value="reactiveInfo.currentTime"
			class="music__progress"
			:tooltip="false"
			:min="0"
			:max="reactiveInfo.duration"
			:disabled="!reactiveInfo.src"
			@dragstart="startDragMusicProgress"
			@dragend="endDragMusicProgress"
		/>

		<div class="progress__num">
			{{ formatTime(reactiveInfo.currentTime) }} /
			{{ formatTime(reactiveInfo.duration) }}
		</div>

		<n-popover trigger="hover">
			<template #trigger>
				<Icon
					name="mdi:volume"
					:size="24"
					class="hover"
					style="margin: 0 10px 0 40px"
				></Icon>
			</template>
			<div class="volume__container">
				<n-slider
					v-model:value="reactiveInfo.volume"
					vertical
					:tooltip="false"
					:min="0"
					:max="100"
					@vue:updated="setVolume"
				></n-slider>
				<span>{{ reactiveInfo.volume }}</span>
			</div>
		</n-popover>

		<div class="lyric hover m-10" @click="changeOpenLyric">词</div>

		<!-- 
			顺序播放 mdi:shuffle-disabled 	0
			列表循环 mdi:repeat				1
			随机播放 mdi:shuffle-variant	2
			单曲循环 mdi:repeat-once		3
			单曲播放 mdi:trending-neutral	4
		-->
		<div style="height: 24px" @click="changeMode">
			<Icon
				v-if="mode === 0"
				name="mdi:shuffle-disabled"
				:size="24"
				class="hover m-10"
			></Icon>
			<Icon
				v-else-if="mode === 1"
				name="mdi:repeat"
				:size="24"
				class="hover m-10"
			></Icon>
			<Icon
				v-else-if="mode === 2"
				name="mdi:shuffle-variant"
				:size="24"
				class="hover m-10"
			></Icon>
			<Icon
				v-else-if="mode === 3"
				name="mdi:repeat-once"
				:size="24"
				class="hover m-10"
			></Icon>
			<Icon
				v-else
				name="mdi:trending-neutral"
				:size="24"
				class="hover m-10"
			></Icon>
		</div>

		<n-popover
			trigger="click"
			placement="top"
			:width="350"
			:arrow-point-to-center="true"
			raw
		>
			<template #trigger>
				<Icon
					name="mdi:playlist-music"
					:size="24"
					class="hover m-10"
				></Icon>
			</template>
			<PlayQueue />
		</n-popover>
		<Teleport to="#teleports">
			<LyricView id="container" :class="{ lyric__hide: !isOpenLyric }" />
		</Teleport>
	</n-flex>
</template>

<style scoped lang="scss">
@use "sass:math" as math;
.play-btn {
	margin: 0 30px;
	$w: 34px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $primary;
	width: $w;
	height: $w;
	border-radius: math.div($w, 2);
	cursor: pointer;
	svg {
		color: #f9f6f8;
	}
	transition: transform 0.1s ease-in;
}
.hover:hover {
	transform: scale(1.08);
}
svg {
	color: $light_text_color;
	fill: $light_text_color;
	cursor: pointer;
	transition: transform 0.1s ease-in;
	&.primary {
		margin: 0 18px;
		color: $primary;
		fill: $primary;
	}
	&.heart {
		margin: 0 40px;
	}
	&:focus {
		outline: none;
	}
}

.music__container {
	position: relative;
	z-index: $z_music_view;
	padding: 0 40px;
	height: 75px;
	background-color: #403e57;
	img {
		border-radius: 5px;
		user-select: none;
		cursor: pointer;
	}
}
.music__info {
	overflow: hidden;
	margin: 0 20px;
	width: 160px;
	height: 45px;
	user-select: none;
	.name {
		// @include ellipsis;
		white-space: nowrap;
		font-size: 15px;
		color: $light_text_color;
		font-weight: bolder;
	}
	.singers {
		@include ellipsis;
		font-size: 10px;
		color: $light_text_color;
	}
}
.music__progress {
	margin: 0 30px;
	width: 550px;
}
.volume__container {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 5px 0;
	width: 25px;
	height: 150px;
}
.progress__num {
	margin: 0 20px;
	width: 90px;
	color: $light_text_color;
	user-select: none;
}
.m-10 {
	margin: 0 10px;
	color: $light_text_color;
}
.lyric {
	height: 24px;
	line-height: 24px;
	font-size: 18px;
	user-select: none;
	cursor: pointer;
	transition: transform 0.1s ease-in;
}
.avatar__container {
	position: relative;
	z-index: 0;
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 5px;
	.cover {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 11;
		position: absolute;
		inset: 0;
		width: 50px;
		height: 50px;
		border-radius: 5px;
		background: #00000080;
		opacity: 0;
		&:hover {
			opacity: 1;
		}
		.lyric {
			transform: rotateZ(180deg);
		}
	}
}
#container {
	margin: 0;
	transition: transform 0.5s ease;
	will-change: transform;
}
.lyric__hide {
	transform: translateY(100vh);
}
</style>
