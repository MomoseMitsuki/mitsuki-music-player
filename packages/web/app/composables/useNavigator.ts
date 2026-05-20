type Id = string | number;

export function useNavigator() {
	const router = useRouter();

	function navigateVideo(id: Id) {
		router.push(`/video/${id}`);
	}

	function navigatePlaylist(id: Id) {
		router.push(`/playlist/${id}`);
	}

	return {
		navigateVideo,
		navigatePlaylist
	};
}
