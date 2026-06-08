import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "@/core/database/prisma.service";
import { PlaylistService } from "@/modules/playlist/playlist.service";

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private playlistService: PlaylistService
	) {}

	get includeWithOwnerUser() {
		return {
			playlists: {
				include: {
					creator: {
						select: {
							id: true,
							name: true
						}
					}
				}
			},
			favMusics: { select: { id: true } },
			favPlaylists: { select: { id: true } },
			favAlbums: { select: { id: true } },
			favVideos: { select: { id: true } },
			favArtists: { select: { id: true } },
			_count: { select: { followers: true, following: true } }
		};
	}

	async createUser(account: string, name: string, password: string) {
		const user = await this.prisma.user.create({
			data: {
				account,
				name,
				password
			},
			include: this.includeWithOwnerUser
		});
		return user;
	}

	async findOneByAccount(account: string) {
		const user = await this.prisma.user.findUnique({
			where: { account },
			include: this.includeWithOwnerUser
		});
		return user;
	}

	async findOneById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: this.includeWithOwnerUser
		});
	}

	async updateLoginTime(id: string) {
		return this.prisma.user.update({
			where: { id },
			data: { loginTime: new Date() }
		});
	}

	async getOwnerUser(id: string) {
		const owner = await this.prisma.user.findUnique({
			where: { id },
			include: this.includeWithOwnerUser
		});

		if (!owner) {
			throw new UnauthorizedException("用户不存在");
		}

		return owner;
	}

	async mapToOwnerUser(user: Awaited<ReturnType<typeof this.getOwnerUser>>) {
		return {
			name: user.name,
			avatar: user.avatar,
			bio: user.bio || "",
			experience: user.experience,
			fansCount: user._count.followers,
			followedCount: user._count.following,
			playlists: user.playlists.map(
				this.playlistService.mapToSimplePlayList
			),
			favorite: {
				musics: user.favMusics.map(p => p.id),
				playlists: user.favPlaylists.map(p => p.id),
				albums: user.favAlbums.map(p => p.id),
				videos: user.favVideos.map(p => p.id),
				artists: user.favArtists.map(p => p.id)
			}
		};
	}
}
