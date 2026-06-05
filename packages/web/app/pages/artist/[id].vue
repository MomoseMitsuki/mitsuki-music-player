<script lang="ts" setup>
import MockArtist from "~/mock/artists.json";
import MockAlbums from "~/mock/albums.json";
import MockMV from "~/mock/video.json";
import MockSongs from "~/mock/music.json";

const data = {
	...MockArtist[0],
	albums: [...MockAlbums],
	songs: [...MockSongs],
	videos: [...MockMV, ...MockMV, ...MockMV]
} as Artist;

const underline_x = ref(0);
const index = ref(0);

function clickNavItem(i: number) {
	index.value = i;
	const GAP = 12;
	const WIDTH = 116;
	underline_x.value = i * WIDTH + (i ? i * GAP : 0);
}
</script>

<template>
	<n-flex vertical class="artist__container">
		<n-flex class="info__container" align="center">
			<NuxtImg
				:src="useAvatar(data.avatar, DefaultAvatar.ARTIST)"
				:placeholder="DefaultAvatar.ARTIST"
				fit="cover"
				width="180"
				height="180"
			/>
			<n-flex vertical>
				<h2 class="name">{{ data.name }}</h2>
				<button class="primary">+ 关注</button>
			</n-flex>
		</n-flex>
		<n-flex align="center" class="artist__nav_container">
			<div
				class="router__active"
				:style="{ transform: `translateX(${underline_x}px)` }"
			></div>
			<div
				class="artist__nav_item"
				:class="{ hover: index === 0 }"
				@click="() => clickNavItem(0)"
			>
				<Icon name="mdi:music" size="18" />
				单曲
			</div>
			<div
				class="artist__nav_item"
				:class="{ hover: index === 1 }"
				@click="() => clickNavItem(1)"
			>
				<Icon name="mdi:folder-music-outline" size="18" />
				专辑
			</div>
			<div
				class="artist__nav_item"
				:class="{ hover: index === 2 }"
				@click="() => clickNavItem(2)"
			>
				<Icon name="mdi:play-box-outline" size="18" />
				MV
			</div>
			<div
				class="artist__nav_item"
				:class="{ hover: index === 3 }"
				@click="() => clickNavItem(3)"
			>
				<Icon name="mdi:information-outline" size="18" />
				资料
			</div>
		</n-flex>
		<div class="page__container">
			<Transition name="page" mode="out-in">
				<div
					v-if="index === 0 && data.songs.length !== 0"
					:key="0"
					style="padding: 0 50px"
				>
					<MusicTable :data="data.songs" />
				</div>
				<div
					v-else-if="index === 1 && data.albums.length !== 0"
					:key="1"
					style="padding: 0 120px"
				>
					<AlbumTable :data="data.albums" :col="4" />
				</div>
				<div
					v-else-if="index === 2 && data.videos.length !== 0"
					:key="2"
					style="padding: 0 150px"
				>
					<VideoTable :data="data.videos" :col="3" />
				</div>
				<n-empty
					v-else
					:key="'empty'"
					size="large"
					description="暂无数据"
					class="empty__data"
				></n-empty>
			</Transition>
		</div>
	</n-flex>
</template>

<style scoped lang="scss">
.artist__container {
	height: calc(100vh - 150px);
}
.info__container {
	color: $bold_text_color;
	margin: 40px 100px 0px 100px;
	img {
		border-radius: 9999px;
		margin-right: 50px;
	}
	button {
		margin-top: 30px;
	}
}

$nav_height: 50px;
.artist__nav_container {
	position: relative;
	margin: 20px 100px;
	height: $nav_height;
	border-bottom: 1px solid #f1eff8;
	.artist__nav_item {
		display: flex;
		align-items: center;
		padding: 0 30px;
		color: $text_color;
		height: $nav_height;
		line-height: $nav_height;
		cursor: pointer;
		&.hover {
			color: $primary;
		}
		&:hover {
			color: $primary;
		}
		svg {
			margin: 0 5px;
		}
	}
	.router__active {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 116px;
		border-bottom: 2px solid $primary;
		transition: transform 0.2s ease;
		will-change: transform;
	}
}

.page__container {
	position: relative;
	flex: 1;
	overflow-y: auto;
	min-height: 0;
}
</style>
