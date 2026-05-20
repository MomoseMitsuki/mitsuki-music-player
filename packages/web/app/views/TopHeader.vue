<script setup lang="ts">
import { storeToRefs } from "pinia";
import SearchInput from "~/components/SearchInput.vue";
import { useUserStore } from "~/stores";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
</script>

<template>
	<n-layout-header class="header__container">
		<SearchInput />
		<div v-if="userInfo === null" class="header__avatar empty">登录</div>
		<div class="user__info">
			<div>未登录</div>
			<div>Lv. 0</div>
		</div>
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
	padding: 0 100px 0 30px;
	height: $header_height;
	background: $bg_color;
	box-shadow: 0 3px 10px #ece9f1;
}
.header__avatar {
	$w: 30px;
	margin-left: auto;
	margin-right: 10px;
	width: $w;
	height: $w;
	line-height: $w;
	border-radius: math.div($w, 2);
	cursor: pointer;
	user-select: none;
	&.empty {
		font-size: 10px;
		color: white;
		text-align: center;
		background-color: $primary;
	}
}
.user__info {
	font-size: 10px;
}
</style>
