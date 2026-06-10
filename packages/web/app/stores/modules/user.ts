import { defineStore } from "pinia";
import MockUser from "~/mock/user.json";
import MockPlayLists from "~/mock/playlists.json";

export const useUserStore = defineStore("userStore", () => {
	const user = ref<User | null>(null);

	login();

	function register() {
		login();
	}

	function login() {
		user.value = {
			...MockUser,
			playlists: [...MockPlayLists],
			privacy_flags: 0,
			favorite: {
				musics: new Set<string>(),
				playlists: new Set<string>(),
				albums: new Set<string>(),
				videos: new Set<string>(),
				artists: new Set<string>()
			}
		};
	}

	function logout() {
		user.value = null;
		navigateTo("/");
	}

	// musicId 为 undefined 是emptyAudio的状态
	function isMusicInFavorite(musicId?: string) {
		if (!user.value || !musicId) {
			return false;
		}
		return user.value.favorite.musics.has(musicId);
	}

	async function toggleFavoriteMusic(musicId?: string) {
		if (user.value === null || !musicId) {
			return;
		}
		if (user.value.favorite.musics.has(musicId)) {
			user.value.favorite.musics.delete(musicId);
		} else {
			user.value.favorite.musics.add(musicId);
		}
	}

	function isVideoInFavorite(videoId?: string) {
		if (!user.value || !videoId) {
			return false;
		}
		return user.value.favorite.videos.has(videoId);
	}

	async function toggleFavoriteVideo(videoId?: string) {
		if (user.value === null || !videoId) {
			return;
		}
		if (user.value.favorite.videos.has(videoId)) {
			user.value.favorite.videos.delete(videoId);
		} else {
			user.value.favorite.videos.add(videoId);
		}
	}

	function isPlayListInFavorite(listId?: string) {
		if (!user.value || !listId) {
			return false;
		}
		return user.value.favorite.playlists.has(listId);
	}

	async function toggleFavoritePlayList(listId?: string) {
		if (user.value === null || !listId) {
			return;
		}
		if (user.value.favorite.playlists.has(listId)) {
			user.value.favorite.playlists.delete(listId);
		} else {
			user.value.favorite.playlists.add(listId);
		}
	}

	function isAlbumInFavorite(albumId?: string) {
		if (!user.value || !albumId) {
			return false;
		}
		return user.value.favorite.albums.has(albumId);
	}

	async function toggleFavoriteAlbum(albumId?: string) {
		if (user.value === null || !albumId) {
			return;
		}
		if (user.value.favorite.albums.has(albumId)) {
			user.value.favorite.albums.delete(albumId);
		} else {
			user.value.favorite.albums.add(albumId);
		}
	}

	function isArtistInFavorite(artistId?: string) {
		if (!user.value || !artistId) {
			return false;
		}
		return user.value.favorite.artists.has(artistId);
	}

	async function toggleFavoriteArtist(artistId?: string) {
		if (user.value === null || !artistId) {
			return;
		}
		if (user.value.favorite.artists.has(artistId)) {
			user.value.favorite.artists.delete(artistId);
		} else {
			user.value.favorite.artists.add(artistId);
		}
	}

	return {
		user,

		logout,
		login,
		register,

		isMusicInFavorite,
		isVideoInFavorite,
		isPlayListInFavorite,
		isAlbumInFavorite,
		isArtistInFavorite,
		toggleFavoriteMusic,
		toggleFavoriteVideo,
		toggleFavoritePlayList,
		toggleFavoriteAlbum,
		toggleFavoriteArtist
	};
});
