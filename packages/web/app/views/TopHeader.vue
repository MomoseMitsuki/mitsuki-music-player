<script setup lang="ts">
const dialog = useDialog();
const userStore = useUserStore();
const { navigateUser, navigateSetting } = useNavigatorStore();
const { show } = useLoginDialog(dialog);

const { user } = storeToRefs(userStore);
const { logout } = userStore;
</script>

<template>
	<n-layout-header class="header__container">
		<SearchInput />
		<n-flex v-if="user === null" style="margin-left: auto">
			<div class="header__avatar empty" @click="show">登录</div>
			<div class="user__info">
				<div class="name">未登录</div>
				<div class="level">Lv. 0</div>
			</div>
		</n-flex>
		<n-flex v-else style="margin-left: auto">
			<n-popover trigger="hover">
				<template #trigger>
					<NuxtImg
						class="header__avatar"
						:src="
							user.avatar
								? user.avatar
								: '/images/default_user_avatar.webp'
						"
						width="45"
						height="45"
						fit="cover"
					/>
				</template>
				<div class="avatar__popover">
					<div @click="navigateUser(user!.id)">我的主页</div>
					<div @click="navigateSetting(user!.id)">个人设置</div>
					<div @click.stop="logout">退出登录</div>
				</div>
			</n-popover>

			<div class="user__info">
				<div class="name">{{ user.name }}</div>
				<div class="level">Lv. 0</div>
			</div>
		</n-flex>
	</n-layout-header>
</template>

<style lang="scss" scoped>
@use "sass:math" as math;
$header_height: 75px;
.header__container {
	position: relative;
	z-index: $z_top_header;
	display: flex;
	align-items: center;
	padding: 0 80px 0 30px;
	height: $header_height;
	background: $bg_color;
	box-shadow: 0 3px 10px #ece9f1;
}

$w: 47px;

.header__avatar {
	width: $w;
	height: $w;
	line-height: $w - 4px;
	text-align: center;
	border-radius: math.div($w, 2);
	border: 2px solid $primary;
	cursor: pointer;
	user-select: none;
	will-change: transform;
	transition: transform 0.2s ease;
	font-family: "思源黑体";
	font-size: 12px !important;
	&.empty {
		font-size: 10px;
		color: white;
		text-align: center;
		background-color: $primary;
	}
	&:hover {
		transform: scale(1.08);
	}
}
.user__info {
	margin-left: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: $w;
	div {
		font-family: "思源黑体";
	}
	.name {
		@include ellipsis;
		width: 80px;
		color: $bold_text_color;
	}
	.level {
		margin-top: 3px;
		width: 40px;
		text-align: center;
		white-space: nowrap;
		border-radius: 9999px;
		color: white;
		background-color: $primary;
		font-size: 8px;
	}
}

.avatar__popover {
	div {
		padding: 0 8px;
		user-select: none;
		cursor: pointer;
		height: 30px;
		line-height: 30px;
		&:hover {
			background-color: $bg_color;
		}
	}
}
</style>
