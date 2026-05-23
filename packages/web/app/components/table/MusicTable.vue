<script lang="ts" setup>
const { addMusic } = useQueueStore();
const userStore = useUserStore();

const { isMusicInFavorite, addMusicToFavorite, deleteMusicFromFavorite } =
	userStore;
const { navigateVideo } = useNavigatorStore();

const { selectedIndex, mouseEnterItem, mouseLeaveItem } = useSelectedIndex();

defineProps<{
	data: Array<Music>;
}>();
</script>

<template>
	<div style="padding: 5px 0">
		<n-flex
			v-for="(item, index) in data"
			:key="item.id"
			align="center"
			class="item__container"
			@mouseenter="() => mouseEnterItem(index)"
			@mouseleave="mouseLeaveItem"
			@click="() => addMusic(item)"
		>
			<div class="index">{{ index + 1 }}</div>
			<NuxtImg
				:src="
					item.avatar
						? item.avatar
						: '/images/default_music_avatar.webp'
				"
				placeholder="/images/default_music_avatar.webp"
				width="50px"
				height="50px"
				fit="cover"
			/>
			<div class="info" :class="{ info__hover: selectedIndex === index }">
				<div class="name">{{ item.name }}</div>
				<div class="singers">
					{{ item.singers ? item.singers : "未知" }}
				</div>
			</div>
			<div v-if="selectedIndex === index" class="icon__space">
				<Icon
					v-if="item.videoId"
					name="mdi:play-box-outline"
					size="20"
					@click.stop="() => navigateVideo(item.videoId)"
				></Icon>
				<div v-else style="width: 20px"></div>
			</div>

			<Icon
				v-if="selectedIndex === index"
				name="mdi:plus"
				size="20"
			></Icon>
			<Icon
				v-if="!isMusicInFavorite(item)"
				name="mdi:cards-heart-outline"
				:size="20"
				class="heart hover"
				@click.stop="() => addMusicToFavorite(item)"
			></Icon>
			<Icon
				v-else
				name="mdi:cards-heart"
				:size="20"
				class="heart hover primary"
				@click.stop="() => deleteMusicFromFavorite(item)"
			></Icon>
			<div class="album">
				{{ item.album ? item.album.name : "-" }}
			</div>
			<div class="duration">{{ formatTime(item.duration) }}</div>
		</n-flex>
	</div>
</template>

<style scoped lang="scss">
svg {
	transition: transform 0.1s ease;
	&:hover {
		color: $primary;
		transform: scale(1.08);
	}
	&.primary {
		color: $primary;
	}
}
.item__container {
	border-radius: 5px;
	height: 75px;
	cursor: pointer;
	user-select: none;
	font-size: 14px;
	color: $text_color;
	img {
		border-radius: 5px;
	}
	&:hover {
		background-color: $light_bg_color;
		// box-shadow:
		// 	2px 0 5px #ece9f1,
		// 	0 2px 5px #ece9f1,
		// 	-2px 0 5px #ece9f1,
		// 	0 -2px 5px #ece9f1;
	}
	.index {
		font-size: 15px;
		width: 40px;
		text-align: center;
	}
	.info {
		margin: 0 5px;
		width: 300px;
		// 110
		&.info__hover {
			width: 236px;
		}
	}
	.name {
		@include ellipsis;
		font-size: 14px;
		color: $text_color;
	}
	.singers {
		@include ellipsis;
		font-size: 11px;
		color: $light_text_color;
	}
	.album {
		@include ellipsis;
		margin-left: 20px;
		width: 300px;
	}
	.duration {
		margin-left: 20px;
	}
}
.icon__space {
	width: 20px;
	height: 20px;
}
</style>
