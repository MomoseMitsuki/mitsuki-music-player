import { toRaw, isRef, type Ref } from "vue";
import { isObject } from "#imports";

type MaybeRef<T> = Ref<T> | T;

function clone<T>(value: T): T {
	// 先脱离 Vue Proxy
	const raw = toRaw(value);
	// structuredClone 支持:
	// Object Array Map Set Date RegExp TypedArray
	return structuredClone(raw);
}

function restore<T>(target: T, snapshot: T) {
	// Set
	if (target instanceof Set && snapshot instanceof Set) {
		target.clear();
		for (const item of snapshot) {
			target.add(item);
		}
		return;
	}

	// Map
	if (target instanceof Map && snapshot instanceof Map) {
		target.clear();

		for (const [k, v] of snapshot) {
			target.set(k, v);
		}

		return;
	}

	// Array
	if (Array.isArray(target) && Array.isArray(snapshot)) {
		target.splice(0, target.length, ...snapshot);
		return;
	}

	// Date
	if (target instanceof Date && snapshot instanceof Date) {
		target.setTime(snapshot.getTime());
		return;
	}

	// Object
	if (isObject(target) && isObject(snapshot)) {
		// 删除新增字段
		for (const key of Object.keys(target)) {
			if (!(key in snapshot)) {
				delete target[key];
			}
		}
		// 恢复旧字段
		Object.assign(target, snapshot);
		return;
	}
	// primitive 交给外层处理
}

export async function useOptimistic<T>(
	state: MaybeRef<T>,
	action: () => Promise<void>
) {
	const target = isRef(state) ? state.value : state;
	const snapshot = clone(target);

	try {
		await action();
	} catch (err) {
		if (isRef(state)) {
			// primitive ref
			if (!isObject(state)) {
				state.value = snapshot;
			} else {
				restore(state.value, snapshot);
			}
		} else {
			restore(state, snapshot);
		}
		throw err;
	}
}
