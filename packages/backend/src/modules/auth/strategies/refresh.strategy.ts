import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { FastifyRequest } from "fastify";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: FastifyRequest) => req?.cookies?.refresh_token || null
			]),
			ignoreExpiration: false,
			secretOrKey: "MUSIC_REFRESH_SECRET_2026"
		});
	}

	async validate(payload: { userId: string }) {
		return { userId: payload.userId };
	}
}
