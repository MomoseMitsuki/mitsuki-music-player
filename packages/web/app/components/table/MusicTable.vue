<script lang="ts" setup>
const { addMusic } = useQueueStore();
const userStore = useUserStore();

const { isMusicInFavorite, toggleFavoriteMusic } = userStore;
const { navigateVideo, navigateArtist, navigateAlbum } = useNavigatorStore();
const { selectedIndex, mouseEnterItem, mouseLeaveItem } = useSelectedIndex();

let cacheIndex = -1;

const isClickPicker = ref(false);

function mouseEnter(index: number) {
	if (isClickPicker.value) {
		cacheIndex = index;
		return;
	}
	mouseEnterItem(index);
}

function mouseLeave() {
	if (isClickPicker.value) {
		cacheIndex = -1;
		return;
	}
	mouseLeaveItem();
}

function cancelPicker() {
	isClickPicker.value = false;
	selectedIndex.value = cacheIndex;
}

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
			@mouseenter="() => mouseEnter(index)"
			@mouseleave="mouseLeave"
			@click="() => addMusic(item)"
		>
			<div class="index">{{ index + 1 }}</div>
			<NuxtImg
				:src="useAvatar(item.avatar, DefaultAvatar.MUSIC)"
				:placeholder="DefaultAvatar.MUSIC"
				width="50px"
				height="50px"
				fit="cover"
			/>
			<div class="info" :class="{ info__hover: selectedIndex === index }">
				<div class="name">{{ item.name }}</div>
				<div class="singers">
					<span v-if="item.singers.length === 0">未知</span>
					<span v-else>
						<span
							v-for="(singer, i) in item.singers"
							:key="singer.id"
						>
							<span
								@click.stop="() => navigateArtist(singer.id)"
								>{{ singer.name }}</span
							>
							{{ i === item.singers.length - 1 ? "" : "、" }}
						</span>
					</span>
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
			<n-popover
				v-if="selectedIndex === index"
				placement="right-start"
				trigger="click"
				@mouseenter="() => mouseEnterItem(index)"
				@clickoutside="cancelPicker"
			>
				<template #trigger>
					<Icon
						name="mdi:plus"
						size="20"
						@click.stop="() => (isClickPicker = true)"
					></Icon>
				</template>
				<PlaylistPicker :id="item.id" />
			</n-popover>

			<Icon
				v-if="!isMusicInFavorite(item.id)"
				name="mdi:cards-heart-outline"
				:size="20"
				class="heart hover"
				@click.stop="() => toggleFavoriteMusic(item.id)"
			></Icon>
			<Icon
				v-else
				name="mdi:cards-heart"
				:size="20"
				class="heart hover primary"
				@click.stop="() => toggleFavoriteMusic(item.id)"
			></Icon>
			<div class="album">
				<span
					v-if="item.album"
					@click.stop="() => navigateAlbum(item.album!.id)"
					>{{ item.album.name }}</span
				>
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
