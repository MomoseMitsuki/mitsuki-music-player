<script lang="ts" setup>
import MusicPage from "~/components/MusicPage.vue";
import MockDataJson from "@/mock/music.json";
const getAllMusic = async (pageSize: number, currentPage: number) => {
	console.log(pageSize, currentPage);
	return {
		total: 20,
		data: MockDataJson as Music[]
	};
};
</script>

<template>
	<div>
		<n-flex style="margin: 20px 0">
			<button class="primary">
				<Icon name="mdi:play" size="20" />
				播放全部
			</button>
			<button>
				<Icon name="mdi:shuffle-variant" size="20" />
				随机播放
			</button>
		</n-flex>
		<MusicPage
			:page-size="10"
			:update-page="getAllMusic"
			:init="() => getAllMusic(10, 1)"
		/>
	</div>
</template>

<style></style>
