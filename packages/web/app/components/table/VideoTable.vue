<script lang="ts" setup>
defineProps<{
	data: Array<Video>;
}>();
</script>

<template>
	<n-grid :cols="4" :x-gap="20" :y-gap="20">
		<n-gi v-for="item in data" :key="item.id">
			<VideoCard :data="item" />
		</n-gi>
	</n-grid>
</template>

<style></style>
