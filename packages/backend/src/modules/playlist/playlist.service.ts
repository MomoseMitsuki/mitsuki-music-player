import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "@/core/database/prisma.service";

@Injectable()
export class PlaylistService {
	constructor(private prisma: PrismaService) {}

	async mapToSimplePlayList(
		playlist: Awaited<ReturnType<typeof this.getPlayList>>
	) {
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
			include: {
				creator: {
					select: {
						id: true,
						name: true
					}
				},
			}
		});

		if (!playlist) {
			throw new NotFoundException("歌单不存在")
		}
		if (userId !== playlist.creator.id && !playlist.public) {
			throw new ForbiddenException("权限不足, 无法访问歌单")
		}

		return playlist;
	}

	async deletePlatyList(id: string, userId: string) {
		const playlist = await this.prisma.playList.findUnique({
			where: { id },
			select: { creatorId: true },
		});

		if (!playlist) {
			throw new NotFoundException('该歌单不存在或已被删除');
		}

		if (playlist.creatorId !== userId) {
			throw new ForbiddenException('你没有权限删除该歌单');
		}

		// 注意：底层隐式多对多关联表（如与 User、Music 的收藏/收录关系）会被 Prisma 自动清理
		return await this.prisma.playList.delete({
			where: { id },
		});
	}
}
