<script setup lang="ts">
import MockMusicJson from "~/mock/music.json";
import MockPlayList from "~/mock/playlist.json";

const route = useRoute();
const id = route.params.id!;
console.log(id);

const data = {
	...MockPlayList,
	data: [...MockMusicJson]
} as PlayList;

provide("currentPlaylist", data);
</script>

<template>
	<div>
		<NuxtPage />
	</div>
</template>
