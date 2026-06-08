import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { FastifyRequest } from "fastify";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: FastifyRequest) => req?.cookies?.access_token || null
			]),
			ignoreExpiration: false,
			secretOrKey: "MUSIC_ACCESS_SECRET_2026"
		});
	}

	async validate(payload: { userId: string }) {
		return { userId: payload.userId };
	}
}
