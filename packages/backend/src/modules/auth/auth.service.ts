import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FastifyReply } from "fastify";
import { UsersService } from "@/modules/user/user.service";
import { CryptoUtil } from "@/common/utils/crypto.util";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async register(registerDto: RegisterDto, res: FastifyReply) {
		const { account, name, password } = registerDto;
		const user = await this.usersService.createUser(
			account,
			name,
			password
		);

		const id: string = user.id;
		const tokens = await this.generateTokens(id);
		this.storeTokensInCookie(res, tokens.accessToken, tokens.refreshToken);

		return this.usersService.mapToOwnerUser(user);
	}

	async login(loginDto: LoginDto, res: FastifyReply) {
		const user = await this.usersService.findOneByAccount(loginDto.account);

		if (!user) {
			throw new UnauthorizedException("用户不存在");
		}

		const isPasswordValid = user
			? await CryptoUtil.verifyPassword(loginDto.password, user.password)
			: false;
		if (!isPasswordValid) {
			throw new UnauthorizedException("账号或密码错误");
		}

		const id: string = user.id;
		// 异步刷新登录时间
		this.usersService.updateLoginTime(id).catch(() => {});

		const tokens = await this.generateTokens(id);
		this.storeTokensInCookie(res, tokens.accessToken, tokens.refreshToken);

		return this.usersService.mapToOwnerUser(user);
	}

	async refreshTokens(userId: string, res: FastifyReply) {
		const tokens = await this.generateTokens(userId);
		this.storeTokensInCookie(res, tokens.accessToken, tokens.refreshToken);
		return { message: "安全续期成功" };
	}

	private async generateTokens(userId: string) {
		const payload = { userId };
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: "MUSIC_ACCESS_SECRET_2026",
				expiresIn: "15m"
			}),
			this.jwtService.signAsync(payload, {
				secret: "MUSIC_REFRESH_SECRET_2026",
				expiresIn: "7d"
			})
		]);
		return { accessToken, refreshToken };
	}

	private storeTokensInCookie(
		res: FastifyReply,
		accessToken: string,
		refreshToken: string
	) {
		// Fastify 独占特性：maxAge 单位为【秒】
		res.setCookie("access_token", accessToken, {
			httpOnly: true,
			secure: false, // 生产环境转 HTTPS 时需改为 true
			sameSite: "lax",
			maxAge: 15 * 60 // 15分钟
		});

		res.setCookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			path: "/auth/refresh", // 限制只有刷新接口能读取
			maxAge: 7 * 24 * 60 * 60 // 7天
		});
	}
}
