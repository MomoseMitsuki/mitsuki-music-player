interface User {
	id: string; // 用户id
	avatar?: string; // 头像
	account: string; // 账号
	name: string; // 用户名
	experience: number; // 用户经验
	bio: string; // 个性签名
	createTime: number; // 用户创建时间
	loginTime: number; // 上次登录时间
	fansCount: number; // 被关注数
	followedCount: number; // 关注的用户
	privacy_flags: number; // 隐私设置
	playlists: Array<SimplePlayList>; // 我的歌单
	favorite: {
		musics: Set<string>; // 收藏单曲
		playlists: Set<string>; // 收藏歌单
		albums: Set<string>; // 收藏专辑
		videos: Set<string>; // 收藏专辑
		artists: Set<string>; // 收藏艺术家
	};
}

interface FavoriteData {
	musics?: Array<Music>;
	playlists?: Array<SimplePlayList>;
	albums?: Array<SimpleAlbum>;
	videos?: Array<Video>;
	artists?: Array<SimpleArtist>;
}

interface ProfileUser {
	avatar?: string; // 头像
	name: string; // 用户名
	bio: string; // 个性签名
	experience: number; // 用户经验
	fansCount: number; // 被关注数
	followedCount: number; // 关注的用户
	playlists: Array<SimplePlayLists>; // 自建歌单
	favorite: FavoriteData;
}

interface SimpleUser {
	avatar?: string;
	id: string;
	name: string;
}

interface VisitorUser {
	avatar?: string;
	name: string;
	experience: number;
}
