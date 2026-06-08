import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

type DeepRecursivelyStripNull<T> = T extends null
	? undefined
	: T extends Date
		? T
		: T extends Array<infer U>
			? Array<DeepRecursivelyStripNull<U>>
			: T extends object
				? {
						[K in keyof T as T[K] extends null
							? never
							: K]: DeepRecursivelyStripNull<T[K]>;
					} & {
						[K in keyof T as T[K] extends null
							? K
							: never]?: undefined;
					}
				: T;

@Injectable()
export class RemoveNullInterceptor<T> implements NestInterceptor<
	T,
	DeepRecursivelyStripNull<T>
> {
	intercept(
		_: ExecutionContext,
		next: CallHandler<T>
	): Observable<DeepRecursivelyStripNull<T>> {
		return next
			.handle()
			.pipe(map((data: T) => this.recursivelyStripNull(data)));
	}

	private recursivelyStripNull<V>(obj: V): DeepRecursivelyStripNull<V> {
		if (obj === null) {
			console.log(obj);
			return undefined as any;
		}

		if (typeof obj !== "object" || obj instanceof Date) {
			return obj as any;
		}

		if (Array.isArray(obj)) {
			return obj.map(item => this.recursivelyStripNull(item)) as any;
		}

		// 运行时的 Object 剥离逻辑保持不变
		const result = Object.fromEntries(
			Object.entries(obj)
				.map(([key, value]) => [key, this.recursivelyStripNull(value)])
				.filter(value => value !== undefined)
		);

		return result as any;
	}
}
