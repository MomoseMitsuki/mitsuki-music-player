<script lang="ts" setup>
const query = ref({
	page: 1,
	total: 1,
	createTime: "all"
});
const selected = ref({
	createTime: "全部"
});
const options = [
	{
		label: "全部",
		key: "all"
	}
];
const nowYear = new Date().getFullYear();
for (let i = 0; i < 5; i++) {
	options.push({
		label: `${nowYear - i}年`,
		key: `${nowYear - i}`
	});
}
options.push({
	label: `${nowYear - 5}年及更早`,
	key: `${nowYear - 5}<`
});
function handleSelectTime(key: string) {
	query.value.createTime = key;
	for (const option of options) {
		if (option.key === key) {
			selected.value.createTime = option.label;
			break;
		}
	}
}
</script>

<template>
	<div class="album__container">
		<div class="page__title">
			<h2>专辑</h2>
			<h5>ALBUMS</h5>
		</div>
		<n-flex align="center" class="query__container">
			<n-dropdown
				trigger="click"
				:options="options"
				placement="bottom-start"
				@select="handleSelectTime"
			>
				<div style="min-width: 116px">
					{{ selected.createTime }}
					<Icon name="mdi:chevron-down" size="20" />
				</div>
			</n-dropdown>
		</n-flex>
		<n-grid :cols="5" :x-gap="20" :y-gap="20">
			<n-grid-item v-for="i in 15" :key="i">
				<AlbumCard
					src="test"
					title="宝石心学院 原生音乐集"
					sub-title="OST"
					date="2024.01.03"
				/>
			</n-grid-item>
		</n-grid>
		<n-flex justify="end" style="margin: 20px">
			<n-pagination
				v-model:page="query.page"
				:page-count="query.total"
				class="album__pagination"
			/>
		</n-flex>
	</div>
</template>

<style scoped lang="scss">
.album__container {
	padding: 30px 50px;
}
.query__container {
	height: 80px;
	div {
		margin-right: 30px;
		padding: 0 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $text_color;
		height: 30px;
		border-radius: 5px;
		white-space: nowrap;
		box-shadow:
			2px 0 5px #ece9f1,
			0 2px 5px #ece9f1,
			-2px 0 5px #ece9f1,
			0 -2px 5px #ece9f1;
		cursor: pointer;
		svg {
			margin-left: 5px;
		}
	}
}
.album__pagination {
	margin: 0 30px 0 auto;
}
</style>
