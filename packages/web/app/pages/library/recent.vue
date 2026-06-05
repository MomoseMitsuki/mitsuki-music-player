<script lang="ts" setup>
const queueStore = useQueueStore();

const { recentQueue } = storeToRefs(queueStore);

const PAGESIZE = 10;

const pageCount = computed(() => {
	return Math.ceil(recentQueue.value.length / PAGESIZE);
});

const page = ref(1);

const data = computed(() => {
	const skip = (page.value - 1) * PAGESIZE;
	return recentQueue.value.slice(skip, skip + PAGESIZE);
});

function updatePage(newPage: number) {
	page.value = newPage;
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
			:page="page"
			:page-count="pageCount"
			@update-page="updatePage"
		/>
	</div>
</template>

<style></style>
