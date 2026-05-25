interface SimpleAlbum extends BaseData {
	avatar?: string;
	name: string;
	singers: SimpleData;
	view: number;
	tag?: string;
}

interface Album extends SimpleAlbum {
	data: Array<Music>;
}

interface SimplePlayList extends BaseData {
	public: boolean;
	avatar?: string;
	name: string;
	creator: SimpleData;
	view: number;
	tag?: string;
}

interface PlayList extends SimplePlayList {
	data: Array<Music>;
}
