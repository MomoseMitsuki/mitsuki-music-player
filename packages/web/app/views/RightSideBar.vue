<script lang="ts" setup>
const dialog = useDialog();

const audioStore = useAudioStore();
const queueStore = useQueueStore();
const userStore = useUserStore();

const { navigatePlaylist } = useNavigatorStore();
const { play, pause } = audioStore;
const { playPrev, playNext } = queueStore;
const { isMusicInFavorite, toggleFavoriteMusic } = userStore;

const { reactiveInfo, isInit, analyser, dataArray } = storeToRefs(audioStore);
const { queue, playIndex } = storeToRefs(queueStore);
const { user } = storeToRefs(userStore);

const { show } = useCreatePlayListDialog(dialog);

const GAP = 2;
const canvasRef = useTemplateRef("canvas");

onMounted(() => {
	const cvs = canvasRef.value!;
	const ctx = cvs.getContext("2d")!;
	function draw() {
		requestIdleCallback(draw);

		const { width, height } = cvs;
		ctx?.clearRect(0, 0, width, height);
		if (!isInit.value) {
			return;
		}
		analyser.value!.getByteFrequencyData(dataArray.value!);
		const len = dataArray.value!.length;
		const barWidth = width / len;
		ctx.fillStyle = "#ed448e";
		for (let i = 0; i < len; i++) {
			const data = dataArray.value![i]!; // < 256
			const barHeight = ((data / 255) * height) / 2;
			const x = i * barWidth + GAP * i;
			const y = height - barHeight;
			ctx.fillRect(x, y, barWidth, barHeight);
		}
	}
	draw();
});
</script>

<template>
	<n-layout-sider width="21vw">
		<n-flex vertical :size="[0, 0]" class="sideBar__container">
			<div class="player__container">
				<h3>正在播放</h3>
				<h5>NOW PLAYING</h5>
				<NuxtImg
					:src="useAvatar(reactiveInfo.avatar, DefaultAvatar.MUSIC)"
					:placeholder="DefaultAvatar.MUSIC"
					width="180"
					height="180"
					style="border-radius: 20px"
				></NuxtImg>
				<n-flex
					align="end"
					justify="space-between"
					style="margin: 5px 0"
				>
					<div>
						<div class="marquee__container">
							<div v-marquee="reactiveInfo.name" class="name">
								{{ reactiveInfo.name }}
							</div>
						</div>
						<div class="singer">
							<span v-if="reactiveInfo.singers.length === 0"
								>未知</span
							>
							<span v-else>
								<span
									v-for="(singer, i) in reactiveInfo.singers"
									:key="singer.id"
								>
									<span>{{ singer.name }}</span>
									{{
										i === reactiveInfo.singers.length - 1
											? ""
											: "、"
									}}
								</span>
							</span>
						</div>
					</div>
					<Icon
						v-if="!isMusicInFavorite(queue[playIndex]?.id)"
						name="mdi:cards-heart-outline"
						:size="24"
						class="heart hover"
						@click.stop="
							() => toggleFavoriteMusic(queue[playIndex]?.id)
						"
					></Icon>
					<Icon
						v-else
						name="mdi:cards-heart"
						:size="24"
						class="heart hover primary"
						@click.stop="
							() => toggleFavoriteMusic(queue[playIndex]!.id)
						"
					></Icon>
				</n-flex>

				<n-flex align="center" justify="center">
					<canvas ref="canvas"></canvas>
				</n-flex>

				<n-flex
					align="center"
					justify="space-between"
					style="margin: 20px 0; padding: 0 50px"
				>
					<Icon
						name="mdi:skip-previous"
						:size="30"
						class="hover"
						@click="playPrev"
					></Icon>

					<div
						v-if="reactiveInfo.paused"
						class="play-btn hover"
						@click="play"
					>
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
				</n-flex>
			</div>
			<n-flex
				align="center"
				justify="space-between"
				style="margin: 20px 30px"
			>
				<div>
					<h3>我的歌单</h3>
					<div class="small-font">MY PLAYLISTS</div>
				</div>
				<div class="small-font" style="cursor: pointer" @click="show">
					+ 新增歌单
				</div>
			</n-flex>
			<div v-if="user?.playlists" class="playlist__container">
				<n-flex
					v-for="item in user!.playlists"
					:key="item.id"
					align="center"
					class="playlist__item"
					@click="() => navigatePlaylist(item.id)"
				>
					<NuxtImg
						:src="useAvatar(item.avatar)"
						:placeholder="DefaultAvatar.MUSIC"
						width="40px"
						height="40px"
						fit="cover"
					></NuxtImg>
					<div>
						<div class="name">{{ item.name }}</div>
						<div class="total">{{ item.total }}首</div>
					</div>
				</n-flex>
			</div>
		</n-flex>
	</n-layout-sider>
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

.playlist__container {
	overflow-y: auto;
	min-height: 0;
	flex: 1;
	padding: 10px 10px;
	img {
		margin-right: 10px;
		border-radius: 5px;
	}
	.playlist__item {
		margin: 3px 0;
		height: 50px;
		padding: 0 20px;
		border-radius: 5px;
		user-select: none;
		cursor: pointer;
		.name {
			@include ellipsis;
			font-size: 13px;
			color: $text_color;
		}
		.total {
			font-size: 10px;
			color: $light_text_color;
		}
		&:hover {
			background: $selected_bg_color;
			.name {
				color: $primary;
			}
			.total {
				color: $primary;
			}
		}
	}
}
.small-font {
	color: $text_color;
	font-size: 10px;
}
.sideBar__container {
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: $z_right_side;
	user-select: none;
	height: calc(100vh - 150px);
	background-color: $light_bg_color;
	box-shadow: -3px 0 10px #ece9f1;
	overflow-x: hidden;
	h3 {
		color: $text_color;
	}
}

.player__container {
	color: $text_color;
	background: $light_bg_color;
	padding: 30px 30px 10px 30px;
	h5 {
		color: $light_text_color;
		font-weight: lighter;
		margin-bottom: 20px;
	}
}
.hover:hover {
	transform: scale(1.08);
}
svg {
	color: $text_color;
	fill: $text_color;
	cursor: pointer;
	transition: transform 0.1s ease-in;
	&.heart.primary {
		margin: 0;
	}
	&.primary {
		margin: 0 18px;
		color: $primary;
		fill: $primary;
	}
	&:focus {
		outline: none;
	}
}
.name {
	font-weight: bolder;
	font-size: 16px;
	color: $text_color;
	white-space: nowrap;
}
.singer {
	@include ellipsis;
	width: 120px;
	font-size: 12px;
}
canvas {
	width: 90%;
	height: 40px;
}
.marquee__container {
	width: 200px;
	overflow: hidden;
	margin-left: 3px;
}
</style>
