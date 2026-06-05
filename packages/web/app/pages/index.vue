<script lang="ts" setup>
import { useHeadSafe } from "#app";

useHeadSafe({
	title: "主页"
});
</script>

<template>
	<div>
		<n-carousel autoplay dot-placement="bottom" class="carousel__container">
			<NuxtImg
				src="/images/carousel.png"
				fit="cover"
				class="carousel__image"
			></NuxtImg>
			<NuxtImg
				src="/images/carousel.png"
				fit="cover"
				class="carousel__image"
			></NuxtImg>
			<NuxtImg
				src="/images/carousel.png"
				fit="cover"
				class="carousel__image"
			></NuxtImg>
			<NuxtImg
				src="/images/carousel.png"
				fit="cover"
				class="carousel__image"
			></NuxtImg>
		</n-carousel>
		<n-flex align="center" style="padding: 20px">
			<FeatureEntry
				src="/images/ost.webp"
				name="原生音乐"
				ename="OST"
			></FeatureEntry>
			<FeatureEntry
				src="/images/character.webp"
				name="角色歌曲"
				ename="CHARACTER SONGS"
			></FeatureEntry>
			<FeatureEntry
				src="/images/theme.webp"
				name="主题曲"
				ename="THEME SONGS"
			></FeatureEntry>
			<FeatureEntry
				src="/images/bgm.webp"
				name="BGM精选"
				ename="BGM COLLECTION"
			></FeatureEntry>
			<FeatureEntry
				src="/images/video.webp"
				name="MV视频"
				ename="MV VIDEO"
			></FeatureEntry>
		</n-flex>
		<div class="show__container">
			<n-flex align="end">
				<h3>最新专辑</h3>
				<h5>NEW RELEASES</h5>
			</n-flex>
			<n-flex
				align="center"
				justify="space-between"
				style="margin: 20px 0"
			>
			</n-flex>
			<n-flex align="end">
				<h3>推荐歌单</h3>
				<h5>RECOMMENDED PLAYLISTS</h5>
			</n-flex>
		</div>
	</div>
</template>

<style scoped lang="scss">
.content__container {
	height: calc(100vh - 150px);
	background-color: #fbfbfd;
}
.carousel__container {
	position: relative;
	width: 100%;
	height: 440px;
}
.show__container {
	padding: 0 50px;
	border-top: 1px solid #fbf9fc;
	h3 {
		color: $text_color;
	}
	h5 {
		margin-left: 10px;
		margin-bottom: 3px;
		color: $light_text_color;
	}
}
.carousel__image {
	width: 100%;
	border-radius: 10px;
}
</style>
