<script lang="ts" setup>
useHeadSafe({
	title: "搜索"
});

const route = useRoute();

const keyword = computed(() => {
	return decodeURIComponent(
		route.query.keyword ? route.query.keyword.toString() : ""
	);
});

const underline_x = ref(0);
const index = ref(0);

function clickNavItem(i: number) {
	index.value = i;
	const GAP = 13;
	const WIDTH = 116;
	underline_x.value = i * WIDTH + (i ? i * GAP : 0);
}
</script>

<template>
	<div class="page__container">
		<div class="page__title">
			<h2>搜索结果</h2>
			<h5>SEARCH RESULT</h5>
		</div>
		<n-flex align="center" class="user__nav_container">
			<div
				class="router__active"
				:class="{ last: index === 4 }"
				:style="{ transform: `translateX(${underline_x}px)` }"
			></div>
			<NuxtLink
				:to="`/search?keyword=${keyword}`"
				class="user__nav_item"
				:class="{ hover: index === 0 }"
				@click="() => clickNavItem(0)"
			>
				<Icon name="mdi:music" size="18" />
				单曲
			</NuxtLink>
			<NuxtLink
				:to="`/search/album?keyword=${keyword}`"
				class="user__nav_item"
				:class="{ hover: index === 1 }"
				@click="() => clickNavItem(1)"
			>
				<Icon name="mdi:folder-music-outline" size="18" />
				专辑
			</NuxtLink>
			<NuxtLink
				:to="`/search/playlist?keyword=${keyword}`"
				class="user__nav_item"
				:class="{ hover: index === 2 }"
				@click="() => clickNavItem(2)"
			>
				<Icon name="mdi:format-list-bulleted" size="18" />
				歌单
			</NuxtLink>
			<NuxtLink
				:to="`/search/video?keyword=${keyword}`"
				class="user__nav_item"
				:class="{ hover: index === 3 }"
				@click="() => clickNavItem(3)"
			>
				<Icon name="mdi:play-box-outline" size="18" />
				视频
			</NuxtLink>
			<NuxtLink
				:to="`/search/artist?keyword=${keyword}`"
				class="user__nav_item"
				:class="{ hover: index === 4 }"
				@click="() => clickNavItem(4)"
			>
				<Icon name="mdi:information-outline" size="18" />
				艺术家
			</NuxtLink>
		</n-flex>
		<NuxtPage />
	</div>
</template>

<style scoped lang="scss">
$nav_height: 50px;
.page__title {
	padding: 50px 100px 0 100px;
}
.user__nav_container {
	position: relative;
	margin: 20px 60px;
	height: $nav_height;
	border-bottom: 1px solid #f1eff8;
	.user__nav_item {
		display: flex;
		align-items: center;
		padding: 0 30px;
		color: $text_color;
		height: $nav_height;
		line-height: $nav_height;
		cursor: pointer;
		&.hover {
			color: $primary;
		}
		&:hover {
			color: $primary;
		}
		svg {
			margin: 0 5px;
		}
	}
	.router__active {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 116px;
		border-bottom: 2px solid $primary;
		transition: transform 0.2s ease;
		will-change: transform;
		&.last {
			width: 130px;
		}
	}
}
</style>
