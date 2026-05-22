type Id = string | number;

export const useNavigatorStore = defineStore("navigatorStore", () => {
	const router = useRouter();

	function navigateVideo(id: Id) {
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

	return {
		navigateVideo,
		navigatePlaylist,
		navigateAlbum,
		navigateArtist
	};
});
