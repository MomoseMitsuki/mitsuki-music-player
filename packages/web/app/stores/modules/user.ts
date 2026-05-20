import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
	const userInfo = ref<User | null>(null);
	return {
		userInfo
	};
});
