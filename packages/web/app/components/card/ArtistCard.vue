<script lang="ts" setup>
defineProps<{
	data: SimpleArtist;
}>();

const userStore = useUserStore();
const { toggleFavoriteArtist, isArtistInFavorite } = userStore;
</script>

<template>
	<n-flex align="center" class="card__container" :size="[20, 0]">
		<NuxtImg
			:src="useAvatar(data.avatar, DefaultAvatar.ARTIST)"
			:placeholder="DefaultAvatar.ARTIST"
			fit="cover"
			width="75"
			height="75"
		/>
		<div class="info__container">
			<n-flex align="center">
				<div>{{ data.name }}</div>
				<button
					:class="{ primary: isArtistInFavorite(data.id) }"
					@click.stop="() => toggleFavoriteArtist(data.id)"
				>
					<n-flex
						v-if="!isArtistInFavorite(data.id)"
						align="center"
						:size="[0, 0]"
					>
						<Icon name="mdi:plus"></Icon>
						<span>关注</span>
					</n-flex>
					<n-flex v-else align="center" :size="[0, 0]">
						<Icon name="mdi:check"></Icon>
						<span>已关注</span>
					</n-flex>
				</button>
			</n-flex>
			<n-flex align="center">
				<div class="info__item">
					<div>{{ data.songsCount }}</div>
					<div>歌曲</div>
				</div>
				<div class="info__item">
					<div>{{ data.albumsCount }}</div>
					<div>专辑</div>
				</div>
				<div class="info__item">
					<div>{{ data.videosCount }}</div>
					<div>MV</div>
				</div>
			</n-flex>
		</div>
	</n-flex>
</template>

<style scoped lang="scss">
.info__container {
	width: 170px;
	user-select: none;
	cursor: pointer;
	.info__item {
		margin-top: 5px;
		font-size: 12px;
		text-align: center;
	}
}
* {
	flex-wrap: nowrap !important;
}
.card__container {
	padding: 15px 10px;
	width: 300px;
	border-radius: 5px;
	background-color: $bg_color;
	img {
		border-radius: 50%;
	}
	button {
		margin: 0 0 0 auto;
		padding: 3px 5px;
		font-size: 12px;
		border-radius: 5px;
		background-color: #fbfbfd;
		&.primary {
			background-color: $primary;
		}
	}
}
.name {
	@include ellipsis;
	width: 100px;
}
</style>
