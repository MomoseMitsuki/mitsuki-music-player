<script lang="ts" setup>
defineProps<{
	src: string;
	title: string;
	singer: string;
	duration: number;
	view: number;
	updateTime: number;
}>();
</script>

<template>
	<div class="card__container">
		<div class="img__container">
			<NuxtImg
				:src="src"
				placeholder="/images/default_video_avatar.webp"
				width="216px"
				height="159px"
				fit="cover"
			/>
			<div>{{ formatTime(duration) }}</div>
		</div>
		<div class="info__container">
			<div class="title">{{ title }}</div>
			<div>{{ singer }}</div>
			<div>{{ view }}次观看 {{ formatTimeAgo(updateTime) }}</div>
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
