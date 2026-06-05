<!-- <script lang="ts" setup>
const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const PAGESIZE = 10;

const pageCount = computed(() => {
	return Math.ceil(user.value!.favorite.musics.data.length / PAGESIZE);
});

const page = ref(1);

const data = computed(() => {
	const skip = (page.value - 1) * PAGESIZE;
	return user.value!.favorite.musics.data.slice(skip, skip + PAGESIZE);
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
			v-if="data.length !== 0"
			:data="data"
			:page="page"
			:page-count="pageCount"
			@update-page="updatePage"
		/>
		<n-empty
			v-else
			size="large"
			description="暂无数据"
			class="empty__data"
		></n-empty>
	</div>
</template>

<style></style> -->
<template>
	<div>收藏歌单页面</div>
</template>

<script lang="ts" setup></script>

<style></style>
