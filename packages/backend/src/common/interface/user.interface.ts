import type { IdArray, BaseData } from "./base.interface";
import type { SimplePlayList } from "./playlist.interface";

export interface User extends BaseData {
	account: string;
	name: string;
	password: string;
	avatar: string | null;
	experience: number;
	bio: string | null;
	privacy_flags: number;
	loginTime: Date | null;
	playlists: SimplePlayList[];
	favMusics: IdArray;
	favPlaylists: IdArray;
	favAlbums: IdArray;
	favVideos: IdArray;
	favArtists: IdArray;
	_count: {
		followers: number;
		following: number;
	};
}
