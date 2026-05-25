interface User {
	id: string; // 用户id
	avatar?: string; // 头像
	name: string; // 用户名
	experience: number; // 用户经验
	createTime: number; // 用户创建时间
	loginTime: number; // 上次登录时间
	follow: number; // 被关注数
	followedUsers: Array<SimpleUser>; // 关注的用户
	playlists: Array<SimplePlayLists>; // 我的歌单
	favorite: {
		musics: Array<Music>; // 收藏单曲
		playlists: Array<SimplePlayList>; // 收藏歌单
		albums: Array<SimpleAlbum>; // 收藏专辑
		videos: Array<Video>; // 收藏专辑
	};
}

interface SimpleUser {
	avatar?: string;
	id: string;
	name: string;
}
