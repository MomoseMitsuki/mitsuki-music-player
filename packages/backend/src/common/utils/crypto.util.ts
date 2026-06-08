import * as argon2 from "argon2";

export class CryptoUtil {
	/**
	 * 使用 Argon2id 异步哈希密码（自动利用 libuv 线程池，不卡死主线程）
	 * @param password 明文密码
	 */
	static async hashPassword(password: string): Promise<string> {
		return argon2.hash(password, {
			type: argon2.argon2id, // 兼顾防侧信道攻击与内存硬化攻击的最安全模式
			memoryCost: 2 ** 16, // 64MB 内存占用（可根据服务器性能微调）
			timeCost: 3, // 迭代 3 次
			parallelism: 4 // 并行度，使用 4 个线程
		});
	}

	/**
	 * 验证密码是否匹配
	 * @param password 用户输入的明文密码
	 * @param storedHash 数据库中存储的 Argon2 哈希特征串
	 */
	static async verifyPassword(
		password: string,
		storedHash: string
	): Promise<boolean> {
		try {
			// argon2 内部自带时序攻击防御机制
			return await argon2.verify(storedHash, password);
		} catch {
			// 如果哈希格式不对或校验出错，直接返回 false
			return false;
		}
	}
}
