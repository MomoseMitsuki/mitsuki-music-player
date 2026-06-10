<script lang="ts" setup>
const props = defineProps<{
	id: string;
}>();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const isOwner = computed(() => {
	return user.value && user.value.id === props.id;
});
</script>

<template>
	<slot v-if="isOwner"></slot>
	<slot v-else name="fallback"></slot>
</template>
