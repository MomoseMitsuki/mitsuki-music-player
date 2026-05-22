import { defineStore } from "pinia";
import MockUser from "~/mock/user.json";

export const useUserStore = defineStore("userStore", () => {
	const user = ref<User | null>(null);

	user.value = { ...MockUser };

	function isMusicInFavorite(music: Music) {
		if (!user.value) {
			return false;
		}
		const index = isInList(music, user.value!.favorite.musics);
		if (index === -1) {
			return false;
		}
		return true;
	}

	function addMusicToFavorite(music: Music) {
		if (!user.value) {
			return;
		}
		if (isMusicInFavorite(music)) {
			return;
		}
		user.value!.favorite.musics.push(music);
	}

	function deleteMusicFromFavorite(music: Music) {
		if (!user.value) {
			return;
		}
		const index = isInList(music, user.value!.favorite.musics);
		if (index === -1) {
			return;
		}
		user.value!.favorite.musics.splice(index, 1);
	}

	return {
		user,
		isMusicInFavorite,
		addMusicToFavorite,
		deleteMusicFromFavorite
	};
});
