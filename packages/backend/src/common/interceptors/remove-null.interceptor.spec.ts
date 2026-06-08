import { ExecutionContext, CallHandler } from "@nestjs/common";
import { of } from "rxjs";
import { RemoveNullInterceptor } from "./remove-null.interceptor";

describe("RemoveNullInterceptor", () => {
	let interceptor: RemoveNullInterceptor<any>;
	let mockExecutionContext: Partial<ExecutionContext>;

	beforeEach(() => {
		interceptor = new RemoveNullInterceptor();
		// 拦截器测试中一般用不到 executionContext 的具体方法，提供一个空 Mock 即可
		mockExecutionContext = {};
	});

	// 核心辅助函数：用来快速模拟 Controller 返回数据并走一遍拦截器
	const runInterceptor = (controllerResult: any): Promise<any> => {
		const mockCallHandler: CallHandler = {
			handle: () => of(controllerResult) // 模拟 Controller 吐出数据
		};

		return new Promise(resolve => {
			interceptor
				.intercept(
					mockExecutionContext as ExecutionContext,
					mockCallHandler
				)
				.subscribe(result => {
					resolve(result);
				});
		});
	};

	it("应该剔除对象中的 null 键，并保留其他正常属性", async () => {
		const input = {
			id: "user-1",
			avatar: null,
			bio: "宝石心学院"
		};

		const result = await runInterceptor(input);

		// 直接判定整个对象。只要没有 avatar 键，测试就会通过
		expect(result).toEqual({
			id: "user-1",
			bio: "宝石心学院"
		});
		expect(result.avatar).toBeUndefined();
	});

	it("应该能够深度递归清洗嵌套对象里的 null", async () => {
		const input = {
			name: "杰伦歌单",
			favorite: {
				musics: ["song-1", "song-2"],
				description: null
			}
		};

		const result = await runInterceptor(input);

		expect(result).toEqual({
			name: "杰伦歌单",
			favorite: {
				musics: ["song-1", "song-2"]
			}
		});
		expect(result.favorite.description).toBeUndefined();
	});

	it("应该能够正确处理数组，清洗数组中对象的 null", async () => {
		const input = [
			{ id: "1", tags: ["流行"], avatar: null },
			{ id: "2", tags: null, avatar: "http://xxx.png" }
		];

		const result = await runInterceptor(input);

		expect(result).toEqual([
			{ id: "1", tags: ["流行"] },
			{ id: "2", avatar: "http://xxx.png" }
		]);
	});

	it("关键边界测试：应该完美放行 Date 对象，不能将其拆解", async () => {
		const now = new Date();
		const input = {
			id: "playlist-1",
			createTime: now,
			updateTime: null
		};

		const result = await runInterceptor(input);

		expect(result).toEqual({
			id: "playlist-1",
			createTime: now
		});
		expect(result.createTime).toBeInstanceOf(Date);
	});
});
