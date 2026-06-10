import {
	Injectable,
	NotFoundException,
	ForbiddenException
} from "@nestjs/common";
import { PrismaService } from "@/core/database/prisma.service";
import { UpdatePlaylistDto } from "./dto";
import type { SimplePlayList } from "@/common/interface";

@Injectable()
export class PlaylistService {
	constructor(private prisma: PrismaService) {}

	private get includeWithSimple() {
		return {
			creator: {
				select: {
					id: true,
					name: true
				}
			}
		};
	}

	async mapToSimplePlayList(playlist: SimplePlayList) {
		if (!playlist) {
			throw new NotFoundException("歌单没有找到");
		}

		return {
			id: playlist.id,
			name: playlist.name,
			avatar: playlist.avatar,
			description: playlist.description,
			public: playlist.public,
			tags: playlist.tags,
			total: playlist.total,
			view: playlist.favorite,
			creator: {
				id: playlist.creator.id,
				name: playlist.creator.name
			},
			createTime: playlist.createTime
		};
	}

	async getPlayList(id: string, userId: string | null) {
		const playlist = await this.prisma.playList.findUnique({
			where: { id },
			include: this.includeWithSimple
		});

		if (!playlist) {
			throw new NotFoundException("歌单不存在");
		}
		if (userId !== playlist.creator.id && !playlist.public) {
			throw new ForbiddenException("权限不足, 无法访问歌单");
		}

		return playlist;
	}

	async deletePlatyList(id: string, userId: string) {
		const playlist = await this.prisma.playList.findUnique({
			where: { id },
			select: { creatorId: true }
		});

		if (!playlist) {
			throw new NotFoundException("该歌单不存在或已被删除");
		}

		if (playlist.creatorId !== userId) {
			throw new ForbiddenException("你没有权限删除该歌单");
		}

		// 注意：底层隐式多对多关联表（如与 User、Music 的收藏/收录关系）会被 Prisma 自动清理
		return await this.prisma.playList.delete({
			where: { id }
		});
	}

	async createPlayList(userId: string, name: string, isPublic: boolean) {
		const playlist = await this.prisma.playList.create({
			data: {
				name: name,
				public: isPublic,
				creator: {
					connect: {
						id: userId
					}
				}
			},
			include: this.includeWithSimple
		});

		return this.mapToSimplePlayList(playlist);
	}

	async updatePlayList(userId: string, dto: UpdatePlaylistDto) {
		const playlist = await this.prisma.playList.findUnique({
			where: { id: dto.id }
		});

		if (!playlist) {
			throw new NotFoundException("歌单不存在");
		}

		if (playlist.creatorId !== userId) {
			throw new ForbiddenException("无权修改该歌单");
		}

		const updateData: Record<string, any> = {};
		if (dto.name !== void 0) updateData.name = dto.name;
		if (dto.avatar !== void 0) updateData.avatar = dto.avatar;
		if (dto.description !== void 0)
			updateData.description = dto.description;

		if (dto.addMusicIds?.length || dto.removeMusicIds?.length) {
			updateData.songs = {};

			if (dto.addMusicIds?.length) {
				updateData.songs.connect = dto.addMusicIds.map(id => ({
					id
				}));
			}

			if (dto.removeMusicIds?.length) {
				updateData.songs.disconnect = dto.removeMusicIds.map(id => ({
					id
				}));
			}
		}

		const newList = await this.prisma.playList.update({
			where: { id: dto.id },
			data: updateData,
			include: this.includeWithSimple
		});

		return this.mapToSimplePlayList(newList);
	}
}
