<script lang="ts" setup>
defineProps<{
	data: Video;
}>();

const { navigateVideo } = useNavigatorStore();
</script>

<template>
	<div class="card__container" @click="() => navigateVideo(data.id)">
		<div class="img__container">
			<NuxtImg
				:src="
					data.avatar
						? data.avatar
						: '/images/default_video_avatar.webp'
				"
				placeholder="/images/default_video_avatar.webp"
				width="216px"
				height="159px"
				fit="cover"
			/>
			<div>{{ formatTime(data.duration) }}</div>
		</div>
		<div class="info__container">
			<div class="title ellipsis">{{ data.name }}</div>
			<div class="ellipsis">{{ data.singers }}</div>
			<div class="ellipsis">
				{{ data.view }}次观看 {{ formatTimeAgo(data.updateTime) }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.card__container {
	width: 216px;
	border-radius: 10px;
	user-select: none;
	cursor: pointer;
	.img__container {
		position: relative;
		transform-origin: center center;
		transition: transform 0.3s ease;
		&:hover {
			transform: scale(1.03);
		}
		img {
			border-radius: 10px;
		}
		div {
			color: white;
			position: absolute;
			right: 10px;
			bottom: 10px;
		}
	}
}
.info__container {
	padding: 0px 10px;
	font-size: 11px;
	.title {
		font-weight: bolder;
		font-size: 15px;
		color: $text_color;
	}
}
</style>
