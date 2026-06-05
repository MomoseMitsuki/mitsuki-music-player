<script lang="ts" setup>
import { PrivacyFlags } from "#imports";

useHeadSafe({
	title: "个人设置"
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();

const isUpdateAvatarSuccess = ref(false);

const form = ref({
	name: user.value!.name,
	bio: user.value!.bio
});
const changePasswordForm = ref({
	oldPassword: "",
	newPassword: "",
	repeatNewPassword: ""
});
const privacy_flags = ref(user.value!.privacy_flags);

function handleChangeFlags(e: Event) {
	const flag = Number((e.target as HTMLInputElement).value) || 0;
	privacy_flags.value ^= flag;
}
</script>

<template>
	<div class="setting__container">
		<n-flex align="center">
			<h1 class="line">个人资料</h1>
			<div class="back__btn" @click="router.back()">返回</div>
		</n-flex>
		<n-flex align="center" class="line">
			<div class="label">头像</div>
			<div>请选择图片文件</div>
		</n-flex>
		<NuxtImg
			:src="
				user!.avatar ? user!.avatar : '/images/default_user_avatar.webp'
			"
			width="200"
			height="200"
			fit="cover"
			class="space__left line"
		/>
		<n-flex align="center" class="space__left line" :size="[0, 0]">
			<button style="width: 90px">重新选择</button>
			<button
				:class="{ disabled: isUpdateAvatarSuccess }"
				class="primary"
				style="width: 90px"
			>
				保存
			</button>
		</n-flex>
		<n-flex align="center" class="line">
			<div class="label">id</div>
			<div class="description">{{ user!.id }}</div>
		</n-flex>
		<n-flex align="center" class="line">
			<div class="label">账号</div>
			<div class="description">{{ user!.account }}</div>
		</n-flex>
		<n-flex align="center" class="line">
			<div class="label">昵称</div>
			<div class="input">
				<n-input
					v-model:value="form.name"
					placeholder="请输入昵称"
				></n-input>
			</div>
		</n-flex>
		<n-flex class="line">
			<div class="label" style="margin-top: 5px">个性签名</div>
			<n-input
				v-model:value="form.bio"
				type="textarea"
				style="width: 80%; height: 120px"
			/>
		</n-flex>
		<h1 class="lint">密码设置</h1>
		<n-flex align="center" class="line">
			<div class="label">旧密码</div>
			<div class="input">
				<n-input
					v-model:value="changePasswordForm.oldPassword"
					placeholder="请输入旧密码"
					type="password"
					show-password-on="mousedown"
					class="input__password"
				/>
			</div>
		</n-flex>
		<n-flex align="center" class="line">
			<div class="label">新密码</div>
			<div class="input">
				<n-input
					v-model:value="changePasswordForm.newPassword"
					placeholder="请输入新密码"
					type="password"
					show-password-on="mousedown"
					class="input__password"
				/>
			</div>
		</n-flex>
		<n-flex align="center" class="line">
			<div class="label">确认新密码</div>
			<div class="input">
				<n-input
					v-model:value="changePasswordForm.repeatNewPassword"
					placeholder="请再次确认新密码"
					type="password"
					show-password-on="mousedown"
					class="input__password"
				/>
			</div>
		</n-flex>
		<div style="margin: 20px">
			<button class="space__left" style="width: 90px">提交</button>
		</div>
		<h1 class="line">隐私设置</h1>
		<n-flex align="center" class="line" :size="[100, 0]">
			<n-flex>
				<div class="label">显示我的歌单</div>
				<n-radio
					:checked="
						(privacy_flags & PrivacyFlags.PERSONAL_PLAYLISTS) ===
						PrivacyFlags.PERSONAL_PLAYLISTS
					"
					:value="PrivacyFlags.PERSONAL_PLAYLISTS"
					@click="handleChangeFlags"
				></n-radio>
			</n-flex>
			<n-flex>
				<div class="label">显示收藏歌单</div>
				<n-radio
					:checked="
						(privacy_flags & PrivacyFlags.FAVORITE_PLAYLISTS) ===
						PrivacyFlags.FAVORITE_PLAYLISTS
					"
					:value="PrivacyFlags.FAVORITE_PLAYLISTS"
					@click="handleChangeFlags"
				></n-radio>
			</n-flex>
		</n-flex>
		<n-flex align="center" class="line" :size="[100, 0]">
			<n-flex>
				<div class="label">显示收藏专辑</div>
				<n-radio
					:checked="
						(privacy_flags & PrivacyFlags.FAVORITE_ALBUMS) ===
						PrivacyFlags.FAVORITE_ALBUMS
					"
					:value="PrivacyFlags.FAVORITE_ALBUMS"
					@click="handleChangeFlags"
				></n-radio>
			</n-flex>
			<n-flex>
				<div class="label">显示收藏音乐</div>
				<n-radio
					:checked="
						(privacy_flags & PrivacyFlags.FAVORITE_MUSICS) ===
						PrivacyFlags.FAVORITE_MUSICS
					"
					:value="PrivacyFlags.FAVORITE_MUSICS"
					@click="handleChangeFlags"
				></n-radio>
			</n-flex>
		</n-flex>
		<n-flex align="center" class="line" :size="[100, 0]">
			<n-flex>
				<div class="label">显示收藏视频</div>
				<n-radio
					:checked="
						(privacy_flags & PrivacyFlags.FAVORITE_VIDEOS) ===
						PrivacyFlags.FAVORITE_VIDEOS
					"
					:value="PrivacyFlags.FAVORITE_VIDEOS"
					@click="handleChangeFlags"
				></n-radio>
			</n-flex>
			<n-flex>
				<div class="label">显示收藏艺术家</div>
				<n-radio
					:checked="
						(privacy_flags & PrivacyFlags.FAVORITE_ARTISTS) ===
						PrivacyFlags.FAVORITE_ARTISTS
					"
					:value="PrivacyFlags.FAVORITE_ARTISTS"
					@click="handleChangeFlags"
				></n-radio>
			</n-flex>
		</n-flex>
	</div>
</template>

<style scoped lang="scss">
:deep(input[type="password"]) {
	font-family: v-sans, system-ui !important;
}
h1 {
	margin: 30px 0;
}

.disabled {
	position: relative;
	&::after {
		content: "";
		position: absolute;
		cursor: not-allowed;
		width: 100%;
		height: 100%;
		background-color: #ffffff80;
	}
	&:hover,
	&:active {
		transform: translate(0);
	}
}
.input {
	width: 200px;
}
$label_width: 120px;
* {
	font-family: "思源黑体";
	color: $bold_text_color;
}

.setting__container {
	padding: 30px 120px;
}
.line {
	margin: 10px 0;
	min-height: 40px;
}
.label {
	width: $label_width;
}
.space__left {
	margin-left: $label_width;
}
.description {
	padding: 0 8px;
}
.back__btn {
	margin: 15px 5px 0 auto;
	cursor: pointer;
	user-select: none;
}
</style>
