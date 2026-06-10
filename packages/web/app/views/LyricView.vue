<script lang="ts" setup>
const audioStore = useAudioStore();

const { reactiveInfo } = storeToRefs(audioStore);

const containerRef = useTemplateRef("containerRef");
const ulRef = useTemplateRef("ulRef");

const pending = ref(true);
const data = ref<Array<LyricLine>>([]);

let maxOffset: number = 0;
let containerHeight: number = 598;
let liHeight: number = 50;

const offset = ref(0);
const currentIndex = ref(0);

eventEmitter.on("MUSIC:TIMEUPDATE", setOffset);

async function requestLyric() {
	pending.value = true;
	if (!reactiveInfo.value.lyricId) {
		data.value = [];
		pending.value = false;
		return;
	}
	const blob = await $fetch<Blob>(
		`/mock/lyric/${reactiveInfo.value.lyricId}.lrc`
	);
	const content = await blob.text();
	data.value = formatLyric(content);
	pending.value = false;
	return;
}

function findIndex(currentTime: number) {
	for (let i = 0; i < data.value.length; i++) {
		if (currentTime < data.value[i]!.time) {
			return i - 1;
		}
	}
	return data.value.length - 1;
}

function setOffset(currentTime: number) {
	currentIndex.value = findIndex(currentTime);
	offset.value =
		liHeight * currentIndex.value + liHeight / 2 - containerHeight / 2;
	maxOffset = ulRef.value!.clientHeight - containerHeight;
	if (offset.value < 0) {
		offset.value = 0;
	}
	if (offset.value > maxOffset) {
		offset.value = maxOffset;
	}
}

watch(() => reactiveInfo.value.lyricId, requestLyric, { immediate: false });

onMounted(() => {
	requestLyric();
});

onUnmounted(() => {
	eventEmitter.off("MUSIC:TIMEUPDATE", setOffset);
});
</script>

<template>
	<div class="page__container">
		<n-flex align="center" class="card__container">
			<div class="info__container">
				<div class="record__container">
					<NuxtImg src="/images/record.webp" width="450" />
					<NuxtImg
						:src="useAvatar(reactiveInfo.avatar)"
						:placeholder="DefaultAvatar.MUSIC"
						width="320"
						height="320"
						fit="cover"
					/>
				</div>
				<div v-marquee="reactiveInfo.name" class="name">
					{{ reactiveInfo.name }}
				</div>
				<div class="singers">
					{{ formatSingers(reactiveInfo.singers!) }}
				</div>
			</div>
			<div class="lyric__container">
				<n-flex v-if="pending" align="center" style="height: 598px">
					<div style="font-size: 30px" class="primary">
						加载歌词中...
					</div>
				</n-flex>
				<div v-else>
					<n-flex
						v-if="data.length === 0"
						vertical
						justify="center"
						style="height: 598px"
					>
						<div
							style="font-size: 35px; margin-left: 100px"
							class="primary"
						>
							暂无歌词
						</div>
					</n-flex>
					<div v-else ref="containerRef" class="container">
						<ul
							ref="ulRef"
							:style="`transform:translateY(-${offset}px)`"
						>
							<li
								v-for="(line, index) in data"
								:key="index"
								:class="{
									active: index === currentIndex
								}"
							>
								{{ line.words }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</n-flex>
	</div>
</template>

<style scoped lang="scss">
@use "sass:math" as math;

.page__container {
	position: absolute;
	z-index: $z_lyric_view;
	inset: 0;
	width: 100%;
	height: calc(100vh - 75px);
	overflow: hidden;
	user-select: none;
	background:
		linear-gradient(135deg, rgb(173, 216, 230), rgb(255, 182, 193)),
		linear-gradient(315deg, rgb(255, 192, 203), rgb(173, 216, 230));
	background-blend-mode: overlay;
	// .background__container {
	// 	position: absolute;
	// 	inset: 0;
	// 	width: 100%;
	// 	height: 100%;
	// }
}
.card__container {
	height: calc(100vh - 75px);
	padding-left: 250px;
}
.info__container {
	width: 450px;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	.name {
		margin-top: 30px;
		font-size: 35px;
	}
	.singers {
		font-size: 20px;
	}
}
.record__container {
	position: relative;
	margin: auto;
	$w: 450px;
	width: $w;
	height: $w;
	border-radius: math.div($w, 2);
	animation: rotate 20s linear infinite;
	img {
		position: absolute;
		left: 50%;
		top: 50%;
		border-radius: 9999px;
		transform: translate(-50%, -50%);
	}
}
.lyric__container {
	margin-left: 180px;
	flex: 1;
	min-width: 400px;
	height: 598px;
	* {
		font-family: "思源黑体";
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
.primary {
	color: $primary;
}
.container {
	height: 598px;
	overflow: hidden;
}
ul {
	will-change: transform;
	transition: transform 0.3s ease;
	list-style: none;
	li {
		color: $text_color;
		height: 50px;
		font-size: 25px;
		line-height: 50px;
		transform: scale(1);
		transform-origin: left;
		transition: transform 0.3s ease;
		&.active {
			color: $primary;
			mix-blend-mode: difference;
			font-weight: bold;
			transform: scale(1.2);
		}
	}
}
</style>
