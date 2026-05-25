<script lang="ts" setup>
const audioStore = useAudioStore();
const queueStore = useQueueStore();
const { navigateVideo } = useNavigatorStore();
const userStore = useUserStore();

const { emptyAudio } = audioStore;
const { playMusic, deleteMusic } = queueStore;
const { isMusicInFavorite, addMusicToFavorite, deleteMusicFromFavorite } =
	userStore;

const { queue } = storeToRefs(queueStore);

const { selectedIndex, mouseEnterItem, mouseLeaveItem } = useSelectedIndex();

const searchValue = ref("");
const isOpenSearchInput = ref(false);

function openSearchInput() {
	isOpenSearchInput.value = !isOpenSearchInput.value;
	searchValue.value = "";
}

function clearDefaultQueue() {
	queue.value = [];
	emptyAudio();
}
</script>

<template>
	<div class="playlist__container">
		<div style="padding: 20px">
			<h2>播放队列</h2>
			<n-flex align="center">
				<div>共{{ queue.length }}首</div>
				<svg
					viewBox="0 0 1024 1024"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					style="margin-left: auto"
					@click="openSearchInput"
				>
					<path
						d="M212.194304 726.972416c33.760256 33.760256 73.08288 60.269568 116.876288 78.792704 45.357056 19.18464 93.518848 28.911616 143.147008 28.911616s97.788928-9.728 143.145984-28.911616c25.648128-10.848256 49.750016-24.457216 72.112128-40.63744l156.345344 156.484608c6.677504 6.683648 15.43168 10.025984 24.18688 10.025984 8.74496 0 17.490944-3.334144 24.1664-10.00448 13.35808-13.345792 13.36832-34.994176 0.021504-48.35328L739.03616 719.985664c30.533632-32.160768 54.736896-69.082112 71.99744-109.889536 19.183616-45.357056 28.911616-93.518848 28.911616-143.147008s-9.728-97.789952-28.911616-143.147008c-18.523136-43.792384-45.033472-83.115008-78.792704-116.876288-33.76128-33.760256-73.083904-60.270592-116.876288-78.793728-45.35808-19.18464-93.518848-28.911616-143.147008-28.911616s-97.789952 9.728-143.147008 28.911616c-43.793408 18.523136-83.116032 45.033472-116.876288 78.793728s-60.269568 73.083904-78.792704 116.876288c-19.183616 45.357056-28.911616 93.518848-28.911616 143.147008s9.728 97.789952 28.911616 143.147008C151.923712 653.888512 178.434048 693.21216 212.194304 726.972416zM260.547584 255.279104c56.539136-56.539136 131.710976-87.676928 211.670016-87.676928 79.958016 0 155.13088 31.137792 211.670016 87.676928s87.675904 131.710976 87.675904 211.670016S740.425728 622.08 683.887616 678.619136c-56.539136 56.539136-131.712 87.676928-211.670016 87.676928-79.95904 0-155.13088-31.136768-211.670016-87.675904s-87.675904-131.712-87.675904-211.670016S204.008448 311.81824 260.547584 255.279104z"
						fill="#897b84"
					></path>
				</svg>
				<Icon
					name="mdi:delete-outline"
					size="20"
					@click="clearDefaultQueue"
				></Icon>
			</n-flex>
			<n-flex
				v-show="isOpenSearchInput"
				align="center"
				style="margin-top: 12px"
			>
				<n-flex align="center" class="input__container">
					<input
						v-model="searchValue"
						type="text"
						spellcheck="false"
					/>
					<Icon
						v-show="searchValue !== ``"
						class="cancel__btn"
						name="mdi:close"
						size="20"
						style="margin: 0 5px 0 auto"
						@click="() => (searchValue = ``)"
					/>
				</n-flex>
				<div class="cancel__btn" @click="openSearchInput">取消</div>
			</n-flex>
		</div>
		<div v-if="queue.length !== 0" class="item__container">
			<!-- width: 350px - padding 40px => 310px -->
			<n-flex
				v-for="(item, index) in queue"
				:key="item.id"
				align="center"
				class="playlist__item"
				@mouseenter="() => mouseEnterItem(index)"
				@mouseleave="mouseLeaveItem"
				@click="() => playMusic(index)"
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
				<div
					class="info"
					:class="{ info__hover: selectedIndex === index }"
				>
					<div class="name">{{ item.name }}</div>
					<div class="singers">
						{{ item.singers ? item.singers : "未知" }}
					</div>
				</div>
				<div v-show="!(selectedIndex === index)" class="duration">
					{{ formatTime(item.duration) }}
				</div>
				<div v-show="selectedIndex === index" class="icon__container">
					<Icon
						v-if="!isMusicInFavorite(item)"
						name="mdi:cards-heart-outline"
						:size="24"
						class=""
						@click.stop="() => addMusicToFavorite(item)"
					></Icon>
					<Icon
						v-else
						name="mdi:cards-heart"
						:size="24"
						class="primary"
						@click.stop="() => deleteMusicFromFavorite(item)"
					></Icon>
					<Icon
						v-if="item.videoId"
						name="mdi:play-box-outline"
						size="20"
						@click.stop="() => navigateVideo(item.videoId)"
					></Icon>
					<div v-else class="icon__space"></div>
					<Icon name="mdi:plus" size="20"></Icon>
					<Icon
						name="mdi:close"
						size="20"
						@click.stop="() => deleteMusic(index)"
					></Icon>
				</div>
			</n-flex>
		</div>
		<n-empty
			v-else
			size="large"
			description="暂无数据"
			class="empty__data"
		></n-empty>
	</div>
</template>

<style scoped lang="scss">
.playlist__container {
	display: flex;
	flex-direction: column;
	height: 525px;
	overflow: hidden;

	background-color: #ffffff;
	user-select: none;
	h2 {
		font-weight: bold;
	}
}

svg {
	color: #897b84;
	cursor: pointer;
	transition: transform 0.1s ease;
	&:hover {
		transform: scale(1.08);
	}
	&.primary {
		color: $primary;
	}
}
.input__container {
	width: 250px;
	border-radius: 5px;
	background-color: #f9f7fb;
}
input {
	width: 212px;
	padding: 6px 10px;
	font-size: 12px;
	color: $text_color;
	border: none;
	background: transparent;
	&:focus-visible {
		outline: none;
	}
}
.cancel__btn {
	user-select: none;
	cursor: pointer;
	margin-left: auto;
	&:hover {
		color: $primary;
	}
}
.item__container {
	width: 100%;
	height: 429px;
	flex: 1;
	min-height: 0;
	overflow-x: hidden;
}
// 310
.playlist__item {
	width: 100%;
	height: 65px;
	cursor: pointer;
	// 45
	&:hover {
		background-color: #f7f6fb;
	}
	.index {
		margin-left: 20px;
		width: 25px;
		text-align: center;
	}
	// 50
	img {
		border-radius: 10px;
	}
	// 135
	.info {
		margin: 0 5px;
		width: 125px;
		white-space: nowrap;
		text-overflow: ellipsis;
		// 110
		&.info__hover {
			width: 100px;
		}
	}
	.name {
		@include ellipsis;
		font-size: 13px;
		color: $text_color;
	}
	.singers {
		@include ellipsis;
		font-size: 10px;
		color: $light_text_color;
	}
	.duration {
		margin: 0 30px 0 auto;
		font-size: 13px;
	}
	.icon__container {
		margin: 0 5px 0 auto;
		display: flex;
		align-items: center;
		width: 90px;
		height: 20px;
		svg {
			margin: 0 3px;
			&:hover {
				color: $primary;
			}
		}
		.icon__space {
			width: 20px;
		}
	}
}
</style>
