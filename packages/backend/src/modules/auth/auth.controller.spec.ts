import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import {
	FastifyAdapter,
	NestFastifyApplication
} from "@nestjs/platform-fastify";
import fastifyCookie from "@fastify/cookie";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RefreshStrategy } from "./strategies/refresh.strategy";
import { UsersService } from "@/modules/user/user.service";
import { CryptoUtil } from "@/common/utils/crypto.util";

describe("AuthController (认证接口集成测试)", () => {
	let app: NestFastifyApplication;

	const mockUser = {
		id: "user_test_id",
		account: "test_music_user",
		password: "",
		name: "Mitsuki",
		avatar: "http://avatar.com/1.png"
	};

	const mockUsersService = {
		findOneByAccount: jest.fn().mockImplementation((account: string) => {
			if (account === mockUser.account) return mockUser;
			return null;
		}),
		updateLoginTime: jest.fn().mockResolvedValue(true)
	};

	beforeAll(async () => {
		mockUser.password = await CryptoUtil.hashPassword("123456");

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [JwtModule.register({})],
			controllers: [AuthController],
			providers: [
				AuthService,
				RefreshStrategy,
				{ provide: UsersService, useValue: mockUsersService }
			]
		}).compile();

		const adapter = new FastifyAdapter();
		await adapter
			.getInstance()
			.register(fastifyCookie, { secret: "TEST_SECRET" });

		app = moduleRef.createNestApplication<NestFastifyApplication>(adapter);
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("/auth/login (POST) - 输入正确账密，应该登录成功并返回 Cookie", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/auth/login",
			headers: { "content-type": "application/json" },
			payload: { account: "test_music_user", password: "123456" }
		});

		expect(response.statusCode).toBe(201);
		const body = JSON.parse(response.body);
		expect(body.message).toBe("登录成功");

		const cookies = response.headers["set-cookie"];
		expect(cookies).toBeDefined();
	});

	it("/auth/login (POST) - 输入错误密码，应该抛出 401", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/auth/login",
			headers: { "content-type": "application/json" },
			payload: { account: "test_music_user", password: "wrong_password" }
		});

		expect(response.statusCode).toBe(401);
	});

	// ==================== 新增：Token 续期测试 ====================

	it("/auth/refresh (POST) - 携带合法的 refresh_token，应该成功续期并刷新双 Token", async () => {
		// 1. 第一步：先调登录接口，去获取真实 refresh_token
		const loginResponse = await app.inject({
			method: "POST",
			url: "/auth/login",
			headers: { "content-type": "application/json" },
			payload: { account: "test_music_user", password: "123456" }
		});

		const cookies = loginResponse.headers["set-cookie"] as string[];
		// 从 Cookie 数组中精准提取出 refresh_token=xxxx 这一项
		const refreshTokenCookie = cookies.find(c =>
			c.startsWith("refresh_token=")
		);
		// 截取掉后面的 Path、Max-Age 等属性，只保留键值对
		const cookieValue = refreshTokenCookie!.split(";")[0];

		// 2. 第二步：携带这个 Cookie 轰炸续期接口
		const response = await app.inject({
			method: "POST",
			url: "/auth/refresh",
			headers: {
				cookie: cookieValue // 注入 Cookie
			}
		});

		// 3. 第三步：验证断言
		expect(response.statusCode).toBe(201);

		const body = JSON.parse(response.body);
		expect(body.message).toBe("安全续期成功");

		// 检查续期接口是否也重新下发了安全的双 Token
		const newCookies = response.headers["set-cookie"];
		expect(newCookies).toBeDefined();
		const newCookieStr = Array.isArray(newCookies)
			? newCookies.join(";")
			: newCookies;
		expect(newCookieStr).toContain("access_token=");
		expect(newCookieStr).toContain("refresh_token=");
	});

	it("/auth/refresh (POST) - 未携带任何 Token，应该直接拦截并返回 401", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/auth/refresh" // 裸奔请求
		});

		expect(response.statusCode).toBe(401);
	});
});
