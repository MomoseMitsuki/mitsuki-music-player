<script lang="ts" setup>
const { navigateArtist } = useNavigatorStore();
const { addMusic } = useQueueStore();

defineProps<{
	data: Array<Music>;
}>();
</script>

<template>
	<n-grid :cols="3">
		<n-gi v-for="item in data" :key="item.id">
			<n-flex
				align="center"
				class="item__container"
				@click="() => addMusic(item)"
			>
				<NuxtImg
					:src="useAvatar(item.avatar, DefaultAvatar.MUSIC)"
					:placeholder="DefaultAvatar.MUSIC"
					width="50px"
					height="50px"
					fit="cover"
				/>
				<div class="info">
					<div class="name">{{ item.name }}</div>
					<div class="singers">
						<span v-if="item.singers.length === 0">未知</span>
						<span v-else>
							<span
								v-for="(singer, i) in item.singers"
								:key="singer.id"
							>
								<span
									@click.stop="
										() => navigateArtist(singer.id)
									"
									>{{ singer.name }}</span
								>
								{{ i === item.singers.length - 1 ? "" : "、" }}
							</span>
						</span>
					</div>
				</div>
				<div class="duration">{{ formatTime(item.duration) }}</div>
			</n-flex>
		</n-gi>
	</n-grid>
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
	flex-wrap: nowrap;
	flex-flow: nowrap !important;
	padding: 0 30px;
	img {
		border-radius: 5px;
	}
	&:hover {
		background-color: $light_bg_color;
	}
	.info {
		margin: 0 5px;
		width: 120px;
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
	.duration {
		margin-left: 10px;
	}
}
.icon__space {
	width: 20px;
	height: 20px;
}
</style>
