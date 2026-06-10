import $style from "./styles/login.module.scss";
import type { DialogOptions, DialogApi } from "naive-ui";
import { Icon } from "#components";
import { NFlex, NInput } from "naive-ui";

export function useLoginDialog(dialog: DialogApi) {
	const userStore = useUserStore();
	const { login, register } = userStore;
	const isLoginDialog = ref(true);

	const loginUserForm = ref({
		account: "",
		password: ""
	});

	const registerUserForm = ref({
		account: "",
		name: "",
		password: "",
		repeatPassword: ""
	});

	function show() {
		function submit(e: MouseEvent) {
			e.stopPropagation();
			if (isLoginDialog.value) {
				login();
			} else {
				register();
			}
			dialogRef.destroy();
		}

		function cancel(e: MouseEvent) {
			e.stopPropagation();
			dialogRef.destroy();
		}

		const options: DialogOptions = {
			icon() {
				return null;
			},
			class: $style.dialog__container,
			closable: false,
			closeOnEsc: true,
			content() {
				return (
					<div style={{ height: "600px" }}>
						<NFlex align="center" justify="end">
							<span onClick={cancel}>
								<Icon
									name="mdi:close"
									size={20}
									class={$style.close__btn}
								/>
							</span>
						</NFlex>
						<h2 class={$style.title}>
							{isLoginDialog.value ? "欢迎回来" : "创建用户"}
						</h2>
						<h5 class={$style.sub__title}>- HanaUsaka -</h5>
						{isLoginDialog.value ? (
							<div>
								<div class={$style.input__item}>
									<NInput
										v-slots={{
											prefix: () => (
												<Icon
													name="mdi:account-outline"
													class={$style.prefix}
												/>
											)
										}}
										v-model:value={
											loginUserForm.value.account
										}
										type="text"
										placeholder="账号"
									/>
								</div>
								<div class={$style.input__item}>
									<NInput
										v-slots={{
											prefix: () => (
												<Icon
													name="mdi:lock-outline"
													class={$style.prefix}
												/>
											)
										}}
										v-model:value={
											loginUserForm.value.password
										}
										type="password"
										placeholder="密码"
										show-password-on="mousedown"
									/>
								</div>
							</div>
						) : (
							<div>
								<div class={$style.input__item}>
									<NInput
										v-slots={{
											prefix: () => (
												<Icon
													name="mdi:account-outline"
													class={$style.prefix}
												/>
											)
										}}
										v-model:value={
											registerUserForm.value.account
										}
										type="text"
										placeholder="账号"
									/>
								</div>
								<div class={$style.input__item}>
									<NInput
										v-slots={{
											prefix: () => (
												<Icon
													name="mdi:account-outline"
													class={$style.prefix}
												/>
											)
										}}
										v-model:value={
											registerUserForm.value.name
										}
										type="text"
										placeholder="昵称"
									/>
								</div>
								<div class={$style.input__item}>
									<NInput
										v-slots={{
											prefix: () => (
												<Icon
													name="mdi:lock-outline"
													class={$style.prefix}
												/>
											)
										}}
										v-model:value={
											registerUserForm.value.password
										}
										type="password"
										placeholder="密码"
										show-password-on="mousedown"
									/>
								</div>
								<div class={$style.input__item}>
									<NInput
										v-slots={{
											prefix: () => (
												<Icon
													name="mdi:lock-outline"
													class={$style.prefix}
												/>
											)
										}}
										v-model:value={
											registerUserForm.value
												.repeatPassword
										}
										type="password"
										placeholder="请再次输入密码"
										show-password-on="mousedown"
									/>
								</div>
							</div>
						)}
						<div class={$style.login__btn} onClick={submit}>
							<Icon name="mdi:star-four-points"></Icon>
							<span>{isLoginDialog.value ? "登录" : "注册"}</span>
							<Icon name="mdi:star-four-points"></Icon>
						</div>
						<div class={$style.change__mode}>
							{isLoginDialog.value ? (
								<div>
									还没有账号?{" "}
									<span
										onClick={() =>
											(isLoginDialog.value = false)
										}
									>
										立即注册
									</span>
								</div>
							) : (
								<div>
									已有账号?{" "}
									<span
										onClick={() =>
											(isLoginDialog.value = true)
										}
									>
										立即登录
									</span>
								</div>
							)}
						</div>
					</div>
				);
			}
		};
		const dialogRef = dialog.info(options);
	}

	return { show };
}
