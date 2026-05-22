interface SimpleAlbum extends BaseData {
	avatar?: string;
	name: string;
	singers: string;
	view: number;
}

interface Album extends SimpleAlbum {
	data: Array<Music>;
}

interface SimplePlayList extends BaseData {
	public: boolean;
	avatar?: string;
	name: string;
	creator: string;
	view: number;
}

interface PlayList extends SimplePlayList {
	data: Array<Music>;
}
