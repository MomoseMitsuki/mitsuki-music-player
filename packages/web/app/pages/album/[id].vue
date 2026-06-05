<script lang="ts" setup>
import MockMusicJson from "~/mock/music.json";
import MockAlbums from "~/mock/albums.json";

const { playLists } = useQueueStore();
const { isAlbumInFavorite, toggleFavoriteAlbum } = useUserStore();

const data = {
	...MockAlbums[0],
	data: [...MockMusicJson]
} as Album;

const route = useRoute();
const id = route.params.id!;
console.log(id);
</script>

<template>
	<n-flex vertical class="playlist__container">
		<n-flex class="info__container">
			<NuxtImg
				:src="useAvatar(data.avatar)"
				:placeholder="DefaultAvatar.MUSIC"
				width="200"
				height="200"
				fit="cover"
				style="border-radius: 10px"
			></NuxtImg>
			<n-flex vertical style="margin: 10px 30px">
				<h2>{{ data.name }}</h2>
				<div class="creator">{{ data.singers.name }}</div>
				<n-flex align="center" class="action">
					<button class="primary" @click="() => playLists(data.data)">
						播放全部
					</button>
					<button
						:class="{ primary: isAlbumInFavorite(data.id) }"
						@click="() => toggleFavoriteAlbum(data.id)"
					>
						<n-flex
							v-if="!isAlbumInFavorite(data.id)"
							align="center"
							:size="[0, 0]"
						>
							<Icon name="mdi:plus"></Icon>
							<span>收藏</span>
						</n-flex>
						<n-flex v-else align="center" :size="[0, 0]">
							<Icon name="mdi:check"></Icon>
							<span>已收藏</span>
						</n-flex>
					</button>
				</n-flex>
			</n-flex>
		</n-flex>
		<div class="total">共 {{ data.data.length }} 首</div>
		<div style="margin: 0 50px 0 100px">
			<MusicTable :data="data.data" class="table" />
		</div>
	</n-flex>
</template>

<style scoped lang="scss">
.playlist__container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 150px);
}
.info__container {
	color: #333;
	letter-spacing: 1px;
	padding: 50px 50px 25px 100px;
	h2 {
		font-size: 25px;
	}
	.creator {
		color: $text_color;
	}
	.action {
		margin-top: auto;
	}
	.table {
		flex: 1;
		overflow-x: hidden;
		overflow-y: scroll;
	}
}
.total {
	letter-spacing: 1px;
	font-size: 18px;
	color: $text_color;
	margin-left: 100px;
}
.table {
	overflow-y: auto;
	min-height: 0;
	flex: 1;
}
</style>
