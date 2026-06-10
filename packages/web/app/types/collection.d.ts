interface SimpleAlbum extends BaseData {
	avatar?: string;
	name: string;
	singers: SimpleData;
	view: number;
	total: number;
	description: string;
	tags: string[];
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
	total: number;
	description: string;
	tags: string[];
}

interface PlayList extends SimplePlayList {
	data: Array<Music>;
}
