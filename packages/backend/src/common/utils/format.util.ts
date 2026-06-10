import type { User, SimplePlayList } from "@/common/interface";

export function formatUser(user: User) {
	return {
		name: user.name,
		avatar: user.avatar,
		bio: user.bio || "",
		experience: user.experience,
		fansCount: user._count.followers,
		followedCount: user._count.following,
		playlists: user.playlists.map(formatSimplePlayList),
		favorite: {
			musics: user.favMusics.map(p => p.id),
			playlists: user.favPlaylists.map(p => p.id),
			albums: user.favAlbums.map(p => p.id),
			videos: user.favVideos.map(p => p.id),
			artists: user.favArtists.map(p => p.id)
		}
	};
}

export function formatSimplePlayList(list: SimplePlayList) {
	return {
		id: list.id,
		name: list.name,
		avatar: list.avatar,
		description: list.description,
		public: list.public,
		tags: list.tags,
		total: list.total,
		view: list.favorite,
		creator: {
			id: list.creator.id,
			name: list.creator.name
		},
		createTime: list.createTime
	};
}
