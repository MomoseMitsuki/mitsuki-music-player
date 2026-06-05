<script lang="ts" setup>
defineProps<{
	data: Array<SimpleArtist>;
}>();

const { navigateArtist } = useNavigatorStore();
</script>

<template>
	<n-grid :cols="3" :x-gap="20" :y-gap="20">
		<n-gi v-for="item in data" :key="item.id">
			<ArtistCard :data="item" @click="() => navigateArtist(item.id)" />
		</n-gi>
	</n-grid>
</template>

<style></style>
