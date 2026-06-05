<script lang="ts" setup>
defineProps<{
	data: SimpleAlbum;
}>();

const { navigateAlbum } = useNavigatorStore();
</script>

<template>
	<div class="card__container" @click="() => navigateAlbum(data.id)">
		<div style="position: relative">
			<NuxtImg
				:src="useAvatar(data.avatar)"
				:placeholder="DefaultAvatar.MUSIC"
				width="180px"
				height="170px"
				fit="cover"
			/>
			<div class="play__btn">
				<Icon name="mdi:play" size="20" />
			</div>
		</div>
		<div class="info__container">
			<h5 class="ellipsis">{{ data.name }}</h5>
			<div class="ellipsis">{{ data.singers.name }}</div>
			<div class="ellipsis">{{ formatDate(data.createTime) }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "sass:math" as math;
.card__container {
	width: 180px;
	height: 245px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow:
		3px 0 10px #ece9f1,
		0 3px 10px #ece9f1,
		-3px 0 10px #ece9f1,
		0 -3px 10px #ece9f1;
	transition: transform 0.3s ease;
	user-select: none;
	cursor: pointer;
	&:hover {
		transform: translateY(-5px);
		box-shadow:
			6px 0 15px #ece9f1,
			0 6px 15px #ece9f1,
			-6px 0 15px #ece9f1,
			0 -6px 15px #ece9f1;
	}
}
.info__container {
	padding: 5px 20px;
	h5 {
		color: $bold_text_color;
	}
	div {
		font-size: 10px;
		color: $text_color;
	}
}
.play__btn {
	$w: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 10px;
	bottom: 15px;
	background-color: #f9f6f8;
	width: $w;
	height: $w;
	border-radius: math.div($w, 2);
	svg {
		color: $primary;
	}
}
</style>
