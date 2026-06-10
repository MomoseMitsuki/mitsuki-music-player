export interface SimplePlayList {
	id: string;
	name: string;
	avatar: string | null;
	createTime: Date;
	updateTime: Date;
	favorite: number;
	description: string;
	public: boolean;
	tags: string[];
	total: number;
	creatorId: string;
	creator: {
		id: string;
		name: string;
	};
}
