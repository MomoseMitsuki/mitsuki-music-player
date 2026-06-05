<script lang="ts" setup>
const router = useRouter();
const data = inject<PlayList>("currentPlaylist")!;

const formData = ref({
	avatar: data.avatar,
	name: data.name,
	description: data.description
});
</script>

<template>
	<n-flex vertical :size="[0, 40]" class="setting__container">
		<n-flex align="center" :size="[75, 0]">
			<NuxtImg
				:src="useAvatar(formData.avatar)"
				:placeholder="DefaultAvatar.MUSIC"
				fit="cover"
				width="200"
				height="200"
			/>
			<div class="select">
				<button>选择封面</button>
				<div>请选择大于600*600px, 小于2M的图片</div>
			</div>
		</n-flex>
		<n-input v-model:value="formData.name" placeholder="请输入歌单名" />
		<n-input
			v-model:value="formData.description"
			type="textarea"
			placeholder="精彩的简介更容易得到编辑的推荐, 让更多人看到你的歌单"
			style="height: 120px"
		/>
		<n-flex align="center" class="submit__container">
			<button class="primary">保存</button>
			<button @click="() => router.go(-1)">取消</button>
		</n-flex>
	</n-flex>
</template>

<style scoped lang="scss">
.setting__container {
	padding: 50px 100px;
	img {
		border-radius: 10px;
	}
	.select {
		width: 200px;
		button {
			margin-bottom: 20px;
		}
	}
}
.submit__container button {
	width: 100px;
}
</style>
