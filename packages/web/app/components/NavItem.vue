<template>
	<NuxtLink :to="to" class="nav__item">
		<Icon :name="icon"></Icon>
		<div class="text">
			<div class="name">{{ name }}</div>
			<div class="ename">{{ ename }}</div>
		</div>
	</NuxtLink>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

defineProps<{
	to: RouteLocationRaw;
	icon: string;
	name: string;
	ename: string;
}>();
</script>

<style scoped lang="scss">
$nav_item_height: 60px;

.nav__item {
	width: 80%;
	display: flex;
	align-items: center;
	text-decoration: none;
	height: $nav_item_height;
	line-height: $nav_item_height;
	margin: auto;
	border-radius: 10px;
	color: $text_color;
	padding: 0 18px;
	user-select: none;
	&:hover {
		color: $primary;
		background: linear-gradient(to right, #f7e2f4 0%, #f9f3fa 100%);
	}
}

.text {
	text-align: start;
	margin: 0 15px;
	.name {
		line-height: 14px;
		font-size: 10px;
	}
	.ename {
		line-height: 11px;
		font-size: 7px;
	}
}
svg {
	display: block;
	width: 25px;
	height: 25px;
}
</style>
