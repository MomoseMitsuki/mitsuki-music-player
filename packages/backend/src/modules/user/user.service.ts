import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "@/core/database/prisma.service";
import type { User } from "@/common/interface";

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
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

	async createUser(account: string, name: string, password: string): Promise<User> {
		const user: User | null = await this.prisma.user.create({
			data: {
				account,
				name,
				password
			},
			include: this.includeWithOwnerUser
		});
		if (!user) {
			throw new UnauthorizedException("用户不存在");
		}
		return user;
	}

	async findOneByAccount(account: string): Promise<User> {
		const user: User | null = await this.prisma.user.findUnique({
			where: { account },
			include: this.includeWithOwnerUser
		});

		if (!user) {
			throw new UnauthorizedException("用户不存在");
		}

		return user
	}

	async findOneById(id: string): Promise<User> {
		const user: User | null = await this.prisma.user.findUnique({
			where: { id },
			include: this.includeWithOwnerUser
		});

		if (!user) {
			throw new UnauthorizedException("用户不存在");
		}

		return user
	}

	async updateLoginTime(id: string) {
		this.prisma.user.update({
			where: { id },
			data: { loginTime: new Date() }
		});
		return
	}

	async getOwnerUser(id: string): Promise<User> {
		const owner: User | null = await this.prisma.user.findUnique({
			where: { id },
			include: this.includeWithOwnerUser
		});

		if (!owner) {
			throw new UnauthorizedException("用户不存在");
		}

		return owner;
	}
}
