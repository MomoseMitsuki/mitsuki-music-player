interface Music extends BaseData {
	avatar?: string;
	name: string;
	src: string;
	duration: number;
	view: number;
	singers?: string;
	album?: SimpleData;
	videoId: string;
	lyricId: string;
}

interface Video extends BaseData {
	avatar?: string;
	description?: string;
	name: string;
	src: string;
	duration: number;
	view: number;
	singers: string;
}

interface Artist extends BaseData {
	avatar?: string;
	name: string;
	albums: Array<SimpleAlbum>;
	songs: Array<Music>;
	videos: Array<Video>;
}

interface QueryMusic {
	total: number;
	data: Array<Music>;
}
