interface User extends BaseData {
	avatar?: string;
	username: string;
	experience: number;
	playlists: Array<SimplePlayLists>;
}
