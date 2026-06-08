import { Controller, Post, Body, Res, UseGuards } from "@nestjs/common";
import type { FastifyReply } from "fastify";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshAuthGuard } from "./guards/refresh-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: FastifyReply
	) {
		return this.authService.login(loginDto, res);
	}

	@Post("refresh")
	@UseGuards(RefreshAuthGuard)
	async refresh(
		@CurrentUser("userId") userId: string,
		@Res({ passthrough: true }) res: FastifyReply
	) {
		return this.authService.refreshTokens(userId, res);
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) res: FastifyReply) {
		res.clearCookie("access_token", { path: "/" });
		res.clearCookie("refresh_token", { path: "/" });
		return { message: "登出成功" };
	}

	@Post("register")
	async register(
		@Body() registerDto: RegisterDto,
		@Res({ passthrough: true }) res: FastifyReply
	) {
		return this.authService.register(registerDto, res);
	}
}
