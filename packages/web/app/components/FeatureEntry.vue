<script lang="ts" setup>
defineProps<{
	clickHandle?: () => void;
	src: string;
	name: string;
	ename: string;
}>();
</script>

<template>
	<n-flex align="center" class="entry__container">
		<NuxtImg :src="src" width="52"></NuxtImg>
		<div>
			<div class="name">{{ name }}</div>
			<div class="ename">{{ ename }}</div>
		</div>
	</n-flex>
</template>

<style scoped lang="scss">
.entry__container {
	margin: 0 30px;
	cursor: pointer;
	user-select: none;
}
.name {
	font-size: 14px;
	font-weight: bolder;
	color: $text_color;
}
.ename {
	font-size: 9px;
	color: $light_text_color;
}
</style>
