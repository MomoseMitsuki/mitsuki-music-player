interface Music extends BaseData {
	avatar?: string;
	name: string;
	src: string;
	duration: number;
	view: number;
	singers: Array<SimpleData>;
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

interface SimpleArtist extends BaseData {
	avatar?: string;
	name: string;
	albumsCount: number;
	videosCount: number;
	songsCount: number;
}

interface Artist extends SimpleArtist {
	albums: Array<SimpleAlbum>;
	videos: Array<Video>;
	songs: Array<Music>;
}

interface QueryMusic {
	total: number;
	data: Array<Music>;
}

interface LyricLine {
	time: number;
	words: string;
}
