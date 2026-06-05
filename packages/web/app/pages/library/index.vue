<script lang="ts" setup>
import MockDataJson from "@/mock/music.json";

// const PAGESIZE = 10;

const data = [...MockDataJson];

function updatePage(page: number) {
	console.log(page);
}
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
			:data="data"
			:page="1"
			:page-count="2"
			@update-page="updatePage"
		/>
	</div>
</template>

<style></style>
