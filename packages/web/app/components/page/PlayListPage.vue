<script lang="ts" setup>
const page = defineModel("page", { type: Number, required: true });
defineProps<{
	col: number;
	pageCount: number;
	data: Array<SimplePlayList>;
}>();

const emit = defineEmits<{
	updatePage: [page: number];
}>();

function updatePage(page: number) {
	emit("updatePage", page);
}
</script>

<template>
	<div>
		<PlayListTable :data="data" :col="col" />
		<n-flex justify="end" style="margin: 20px">
			<n-pagination
				v-model:page="page"
				:page-count="pageCount"
				style="margin: 0 30px 0 auto"
				@update-page="updatePage"
			/>
		</n-flex>
	</div>
</template>

<style scoped lang="scss"></style>
