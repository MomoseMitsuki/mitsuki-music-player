<script lang="ts" setup>
import MockPlayLists from "@/mock/playlists.json";
import MockAlbums from "@/mock/albums.json";
import MockUser from "@/mock/user.json";
import MockMusics from "@/mock/music.json";
import MockMV from "~/mock/video.json";
import MockArtist from "~/mock/artists.json";

useHeadSafe({
	title: "个人主页"
});

const route = useRoute();
const userStore = useUserStore();
const { navigateSetting } = useNavigatorStore();

const { user } = storeToRefs(userStore);

const view_playLists = ref([...MockPlayLists]);
const underline_x = ref(0);
const index = ref(0);

const currentUser = ref<ProfileUser>({
	...MockUser,
	playlists: [...MockPlayLists],
	favorite: {
		musics: [...MockMusics],
		playlists: [...MockPlayLists],
		albums: [...MockAlbums],
		videos: [...MockMV],
		artists: [...MockArtist]
	}
});

for (let i = 0; i < 11; i++) {
	currentUser.value.favorite.artists?.push({
		...MockArtist[0]!,
		id: `${i + 2}`
	});
}

const id = route.params.id!;
const isSelf = id === user.value?.id;

function clickNavItem(i: number) {
	index.value = i;
	const GAP = 13;
	const WIDTH = 116;
	underline_x.value = i * WIDTH + (i ? i * GAP : 0);
}

console.log("user", id, isSelf);
</script>

<template>
	<div class="page__container">
		<n-flex align="center" class="person__container">
			<NuxtImg
				:src="
					currentUser!.avatar
						? currentUser!.avatar
						: '/images/default_user_avatar.webp'
				"
				width="225"
				height="225"
				fit="cover"
				class="avatar__container"
			/>
			<n-flex vertical class="info__container">
				<div class="username">{{ currentUser!.name }}</div>
				<div class="desc">{{ currentUser.bio }}</div>
				<n-flex align="center" class="follow__container">
					<div class="follow__item">
						<div class="count">
							{{ currentUser!.followedCount }}
						</div>
						<div class="name">关注</div>
					</div>
					<div class="follow__item">
						<div class="count">{{ currentUser!.fansCount }}</div>
						<div class="name">粉丝</div>
					</div>
				</n-flex>
			</n-flex>
			<button
				style="margin-left: auto"
				@click="() => navigateSetting(user!.id)"
			>
				<Icon name="mdi:cog" size="15" />
				<span>设置</span>
			</button>
		</n-flex>
		<n-flex align="end" class="title__container">
			<h2>自建歌单</h2>
			<h4>MY PLAYLISTS</h4>
			<div>查看全部 ></div>
		</n-flex>
		<PlayListTable
			:data="view_playLists"
			:col="4"
			class="table__container"
		/>
		<n-flex align="end" class="title__container">
			<h2>我的收藏</h2>
			<h4>MY FAVORITE</h4>
			<div>查看全部 ></div>
		</n-flex>
		<n-flex align="center" class="user__nav_container">
			<div
				class="router__active"
				:class="{ last: index === 4 }"
				:style="{ transform: `translateX(${underline_x}px)` }"
			></div>
			<div
				class="user__nav_item"
				:class="{ hover: index === 0 }"
				@click="() => clickNavItem(0)"
			>
				<Icon name="mdi:music" size="18" />
				单曲
			</div>
			<div
				class="user__nav_item"
				:class="{ hover: index === 1 }"
				@click="() => clickNavItem(1)"
			>
				<Icon name="mdi:folder-music-outline" size="18" />
				专辑
			</div>
			<div
				class="user__nav_item"
				:class="{ hover: index === 2 }"
				@click="() => clickNavItem(2)"
			>
				<Icon name="mdi:format-list-bulleted" size="18" />
				歌单
			</div>
			<div
				class="user__nav_item"
				:class="{ hover: index === 3 }"
				@click="() => clickNavItem(3)"
			>
				<Icon name="mdi:play-box-outline" size="18" />
				视频
			</div>
			<div
				class="user__nav_item"
				:class="{ hover: index === 4 }"
				@click="() => clickNavItem(4)"
			>
				<Icon name="mdi:information-outline" size="18" />
				艺术家
			</div>
		</n-flex>
		<div style="padding: 10px 80px">
			<Transition name="page" mode="out-in">
				<MusicList
					v-if="index === 0"
					:data="currentUser.favorite.musics!"
				/>
				<AlbumTable
					v-else-if="index === 1"
					:data="currentUser.favorite.albums!"
					:col="4"
					style="padding-left: 30px"
				/>
				<PlayListTable
					v-else-if="index === 2"
					:data="currentUser.favorite.playlists!"
					:col="4"
					style="padding-left: 30px"
				/>
				<VideoTable
					v-else-if="index === 3"
					:data="currentUser.favorite.videos!"
					:col="3"
					style="padding-left: 72px"
				/>
				<ArtistTable
					v-else-if="index === 4"
					:data="currentUser.favorite.artists!"
					class="flex__center"
				/>
			</Transition>
		</div>
	</div>
</template>

<style scoped lang="scss">
.title__container {
	margin-top: 50px;
	padding: 0 120px;
	color: $bold_text_color;
	h4 {
		margin-left: 10px;
		margin-bottom: 3px;
		color: $light_text_color;
	}
	div {
		user-select: none;
		cursor: pointer;
		color: $text_color;
		margin-left: auto;
		&:hover {
			color: $primary;
		}
	}
}
.page__container {
	padding: 50px 0;
}
.person__container {
	padding: 0 50px 0 120px;
	color: $bold_text_color;
}
.info__container {
	width: 50%;
	height: 180px;
	margin-left: 50px;
	.username {
		font-size: 30px;
	}
	.desc {
		color: $text_color;
	}
}
.avatar__container {
	border: 5px solid $primary;
	border-radius: 9999px;
}
.follow__container {
	margin-top: auto;
}
.follow__item {
	text-align: center;
	margin-right: 30px;
	user-select: none;
	cursor: pointer;
	&:hover {
		color: $primary;
	}
	.name {
		font-family: "思源黑体";
		font-size: 15px;
	}
	.count {
		font-family: "思源黑体";
		font-size: 20px;
	}
}
.table__container {
	padding: 20px 55px 10px 110px;
	gap: 20px 0 !important;
}

$nav_height: 50px;
.user__nav_container {
	position: relative;
	margin: 20px 100px;
	height: $nav_height;
	border-bottom: 1px solid #f1eff8;
	.user__nav_item {
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
		&.last {
			width: 130px;
		}
	}
}
</style>
