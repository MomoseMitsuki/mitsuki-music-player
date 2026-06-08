// src/common/utils/crypto.util.spec.ts
import { CryptoUtil } from "./crypto.util";

describe("CryptoUtil (密码加密工具)", () => {
	const plainPassword = "MySecretPassword2026";

	it("应该成功将明文密码哈希，且密文不等于明文", async () => {
		const hash = await CryptoUtil.hashPassword(plainPassword);

		expect(hash).toBeDefined();
		expect(hash).not.toEqual(plainPassword);
		// 验证是否是标准的 argon2id 格式
		expect(hash).toContain("$argon2id$");
	});

	it("输入正确密码应该验证通过 (true)", async () => {
		const hash = await CryptoUtil.hashPassword(plainPassword);
		const isValid = await CryptoUtil.verifyPassword(plainPassword, hash);

		expect(isValid).toBe(true);
	});

	it("输入错误密码应该拒绝通过 (false)", async () => {
		const hash = await CryptoUtil.hashPassword(plainPassword);
		const isValid = await CryptoUtil.verifyPassword("WrongPassword", hash);

		expect(isValid).toBe(false);
	});
});
