<template>
	<div>
		<NuxtRouteAnnouncer />
		<NuxtWelcome />
	</div>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s ease;
	will-change: transform, opacity;
}

.page-enter-from {
	opacity: 0;
	transform: translateY(20px);
}
.page-enter-to {
	opacity: 1;
	transform: translateY(0);
}

.page-leave-from {
	opacity: 1;
	transform: translateY(0);
}
.page-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
</style>
