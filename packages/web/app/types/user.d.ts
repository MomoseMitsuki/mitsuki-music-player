interface User {
	id: string;
	avatar?: string;
	name: string;
	experience: number;
	createTime: number;
	loginTime: number;
	playlists: Array<SimplePlayLists>; // 我的歌单
	favorite: {
		musics: Array<Music>; // 收藏单曲
		playlists: Array<SimplePlayList>; // 收藏歌单
		albums: Array<SimpleAlbum>; // 收藏专辑
		videos: Array<Video>; // 收藏专辑
	};
}
