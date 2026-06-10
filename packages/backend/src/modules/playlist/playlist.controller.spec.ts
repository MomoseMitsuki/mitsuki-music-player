import { Test, TestingModule } from "@nestjs/testing";
import {
	FastifyAdapter,
	NestFastifyApplication
} from "@nestjs/platform-fastify";
import fastifyCookie from "@fastify/cookie";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

describe("PlaylistController (歌单接口集成测试)", () => {
	let app: NestFastifyApplication;
	let jwtService: JwtService;

	const mockPlaylistService = {
		deletePlatyList: jest.fn(),
		createPlayList: jest.fn(),
		updatePlayList: jest.fn(),
		mapToSimplePlayList: jest.fn(data => data)
	};

	const mockUserId = "secure_user_uuid_2026";
	let validAccessTokenCookie: string;

	beforeAll(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: "MUSIC_ACCESS_SECRET_2026",
					signOptions: { expiresIn: "1h" }
				})
			],
			controllers: [PlaylistController],
			providers: [
				JwtStrategy,
				{ provide: PlaylistService, useValue: mockPlaylistService }
			]
		}).compile();

		const adapter = new FastifyAdapter();
		await adapter
			.getInstance()
			.register(fastifyCookie, { secret: "TEST_SECRET" });

		app = moduleRef.createNestApplication<NestFastifyApplication>(adapter);
		await app.init();

		jwtService = moduleRef.get<JwtService>(JwtService);

		const token = jwtService.sign({ userId: mockUserId });
		validAccessTokenCookie = `access_token=${token}`;
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("DELETE /playlist - 应该只接收歌单 id，并安全传入 Cookie 中的 userId 执行删除", async () => {
		mockPlaylistService.deletePlatyList.mockResolvedValue({
			success: true
		});

		// 发起模拟 HTTP 请求
		const response = await app.inject({
			method: "DELETE",
			url: "/playlist",
			headers: {
				cookie: validAccessTokenCookie, // 传入包含身份凭证的 Cookie
				"content-type": "application/json"
			},
			payload: {
				id: "target-playlist-uuid"
			}
		});

		// 断言 1: 状态码应当为 200 成功
		expect(response.statusCode).toBe(200);

		// 断言 2: 核心安全校验
		// 确保 Controller 正确将 Body 里的歌单 id 和从 Cookie 顺过来的 mockUserId 结合并投递
		expect(mockPlaylistService.deletePlatyList).toHaveBeenCalledWith(
			"target-playlist-uuid",
			mockUserId
		);
	});

	it("DELETE /playlist - 当未携带身份 Cookie 时，应该直接被守卫拦截并返回 401", async () => {
		const response = await app.inject({
			method: "DELETE",
			url: "/playlist",
			payload: { id: "target-playlist-uuid" } // 不带任何凭证
		});

		expect(response.statusCode).toBe(401);

		// 确保 Guard 将其拦截在门外，完全没有触碰到内部的业务 Service
		expect(mockPlaylistService.deletePlatyList).not.toHaveBeenCalled();
	});
});
