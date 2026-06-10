<script lang="ts" setup>
defineProps<{
	id: string;
}>();
const dialog = useDialog();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const { show } = useCreatePlayListDialog(dialog);
</script>

<template>
	<div class="playlist__picker">
		<div class="playlist__item" @click.stop="show">新增歌单 +</div>
		<div
			v-for="list in user!.playlists"
			:key="list.id"
			class="playlist__item"
		>
			{{ list.name }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.playlist__picker {
	width: 180px;
	height: 300px;
	overflow-x: hidden;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	.playlist__item {
		$p: 5px;
		$h: 50px;
		@include ellipsis;
		padding: $p 10px;
		height: $h;
		line-height: $h - $p * 2;
		cursor: pointer;
		user-select: none;
		&:hover {
			color: $primary;
			background-color: $bg_color;
		}
	}
}
</style>
