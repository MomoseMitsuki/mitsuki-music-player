type Id = string | number;

export const useNavigatorStore = defineStore("navigatorStore", () => {
	const router = useRouter();

	function navigateVideo(id: Id) {
		eventEmitter.emit("VIDEO:PLAY");
		router.push(`/video/${id}`);
	}

	function navigatePlaylist(id: Id) {
		router.push(`/playlist/${id}`);
	}

	function navigateAlbum(id: Id) {
		router.push(`/album/${id}`);
	}

	function navigateArtist(id: Id) {
		router.push(`/artist/${id}`);
	}

	function navigateUser(id: Id) {
		router.push(`/user/${id}`);
	}

	function navigateSetting(id: Id) {
		router.push(`/user/${id}/setting`);
	}

	return {
		navigateVideo,
		navigatePlaylist,
		navigateAlbum,
		navigateArtist,
		navigateUser,
		navigateSetting
	};
});
