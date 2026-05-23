<script lang="ts" setup>
defineProps<{
	col: number;
	data: Array<SimplePlayList>;
}>();
</script>

<template>
	<n-grid :cols="col" :x-gap="20" :y-gap="20" style="margin: 10px 0">
		<n-grid-item v-for="item in data" :key="item.id">
			<PlayListCard :data="item" />
		</n-grid-item>
	</n-grid>
</template>

<style></style>
