<script lang="ts" setup>
import { useHeadSafe } from "#app";

const route = useRoute();

useHeadSafe({
	title: "音乐库"
});

const underline_x = ref(0);

watch(
	() => route.path,
	() => {
		const childPath = route.path.replace(/^\/library\/?/, "");
		const childPathArr = ["", "local", "recent", "love"];
		const index = childPathArr.findIndex(
			(path: string) => path === childPath
		);
		const GAP = 12;
		const WIDTH = 144;
		underline_x.value = index * WIDTH + (index ? index * GAP : 0);
	},
	{
		immediate: true
	}
);
</script>

<template>
	<div class="library__container">
		<div class="page__title">
			<h2>音乐库</h2>
			<h5>LIBRARIES</h5>
		</div>
		<n-flex align="center" class="library__nav_container">
			<div
				class="router__active"
				:style="{ transform: `translateX(${underline_x}px)` }"
			></div>
			<NuxtLink class="library__nav_item" to="/library">
				<Icon name="mdi:music" size="18" />
				全部音乐
			</NuxtLink>
			<NuxtLink class="library__nav_item" to="/library/local">
				<Icon name="mdi:folder-music-outline" size="18" />
				本地管理
			</NuxtLink>
			<NuxtLink class="library__nav_item" to="/library/recent">
				<Icon name="mdi:clock-outline" size="18" />
				最近播放
			</NuxtLink>
			<NuxtLink class="library__nav_item" to="/library/love">
				<Icon name="mdi:heart-outline" size="18" />
				收藏音乐
			</NuxtLink>
		</n-flex>
		<NuxtPage />
	</div>
</template>

<style scoped lang="scss">
.library__container {
	padding: 30px 50px;
}

$nav_height: 50px;
.library__nav_container {
	position: relative;
	margin: 30px 0;
	height: $nav_height;
	border-bottom: 1px solid #f1eff8;
	.router__active {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 144px;
		border-bottom: 2px solid $primary;
		transition: transform 0.2s ease;
		will-change: transform;
	}
}
.library__nav_item {
	display: flex;
	align-items: center;
	padding: 0 30px;
	color: $text_color;
	height: $nav_height;
	line-height: $nav_height;
	cursor: pointer;
	&:hover {
		color: $primary;
	}
	svg {
		margin: 0 5px;
	}
}
.router-link-exact-active {
	color: $primary;
}
</style>
