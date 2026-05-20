<script setup lang="ts">
import NavItem from "~/components/NavItem.vue";
</script>

<template>
	<n-layout-sider class="side__container" width="14.5vw">
		<NuxtImg
			src="/images/diamond.webp"
			width="200"
			class="bottom__diamond"
		/>
		<NuxtImg src="/images/logo.webp" width="100" />
		<h1 class="title">花逢坂町</h1>
		<h2 class="title">- HanaoUsaka -</h2>
		<div class="space"></div>
		<NavItem to="/" icon="mdi:home" name="首页" ename="HOME"></NavItem>
		<NavItem
			to="/library"
			icon="mdi:music-box-outline"
			name="音乐库"
			ename="LIBRARY"
		></NavItem>
		<NavItem
			to="/album"
			icon="mdi:beats"
			name="专辑"
			ename="ALBUMS"
		></NavItem>
		<!-- <NavItem
			to="/artist"
			icon="mdi:account-outline"
			name="艺术家"
			ename="LIBRARY"
		></NavItem> -->
		<NavItem
			to="/playlist"
			icon="mdi:format-list-bulleted"
			name="歌单"
			ename="PLAYLISTS"
		></NavItem>
		<NavItem
			to="/video"
			icon="mdi:play-box-outline"
			name="视频"
			ename="VIDEOS"
		></NavItem>
		<NavItem
			to="/about"
			icon="mdi:information-outline"
			name="关于"
			ename="ABOUT"
		></NavItem>
	</n-layout-sider>
</template>

<style scoped lang="scss">
.router-link-active,
.router-link-exact-active {
	color: $primary;
	background: linear-gradient(to right, #f7e2f4 0%, #f9f3fa 100%);
}
.side__container {
	position: relative;
	z-index: $z_left_side;
	background: linear-gradient(
		to bottom,
		#e2d7f3 0%,
		#f9f7fc 10%,
		#f9f7fc 100%
	);
	backdrop-filter: blur(10px);
	height: 100%;
	text-align: center;
	padding: 10px 0;
	box-shadow: 3px 0 10px #ece9f1;
}
.space {
	height: 40px;
}
.title {
	@include gradient-text(linear-gradient(to bottom, #b45a92, #ec4a84));
	font-family: "筑紫明朝", serif;
	text-shadow: 0px 2px 4px rgba(140, 69, 150, 0.3);
	font-size: 28px;
	user-select: none;
}
h1.title {
	margin-top: -15px;
	letter-spacing: 2px;
}
h2.title {
	margin: 10px;
	font-family: "Montserra";
	font-weight: lighter;
	font-size: 12px;
	letter-spacing: 2px;
	margin: 3px;
}
.bottom__diamond {
	position: absolute;
	left: 0;
	bottom: 0;
}
</style>
