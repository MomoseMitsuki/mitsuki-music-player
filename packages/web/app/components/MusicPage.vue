<script lang="tsx" setup>
import { Icon } from "#components";
import type { DataTableColumns } from "naive-ui";

const $style = useCssModule();

const props = defineProps<{
	pageSize: number;
	init: () => Promise<QueryMusic> | QueryMusic;
	updatePage: (
		pageSize: number,
		currentPage: number
	) => Promise<QueryMusic> | QueryMusic;
}>();

const dataRef: Ref<Array<Music>> = ref([]);
const loadingRef = ref(false);
const totalRef = ref(0);

interface RowData extends Music {
	index: number;
}

const pagination = reactive({
	page: 1,
	pageSize: props.pageSize,
	itemCount: totalRef.value
});
// 1130
const columns: DataTableColumns<RowData> = [
	{
		title: "#",
		key: "index",
		width: 90,
		render(_, index: number) {
			return index + 1 + (pagination.page - 1) * pagination.pageSize;
		}
	},
	{
		title: "歌曲",
		key: "name",
		width: 250,
		ellipsis: true
	},
	{
		title: "艺术家",
		key: "singers",
		width: 150,
		render(data) {
			return data.singers ? data.singers : "未知";
		},
		ellipsis: true
	},
	{
		title: "专辑",
		key: "album",
		width: 250,
		render(data) {
			return data.album ? data.album.name : "-";
		},
		ellipsis: true
	},
	{
		title: "时长",
		key: "duration",
		width: 110,
		render(data) {
			return formatTime(data.duration);
		}
	},
	{
		title: "",
		key: "action",
		width: 120,
		render() {
			return (
				<div class={$style.icon__container}>
					<Icon
						name="mdi:cards-heart-outline"
						size="20"
						class={$style.icon}
					></Icon>
					<Icon
						name="mdi:play-box-outline"
						size="20"
						class={$style.icon}
					></Icon>
					<Icon name="mdi:plus" size="20" class={$style.icon}></Icon>
				</div>
			);
		}
	}
];

async function setData(data: QueryMusic, currentPage: number = 1) {
	pagination.itemCount = data.total;
	pagination.page = currentPage;
	dataRef.value = data.data;
	loadingRef.value = false;
}

async function handlePageChange(currentPage: number) {
	if (!loadingRef.value) {
		loadingRef.value = true;
		const data = await props.updatePage(props.pageSize, currentPage);
		setData(data, currentPage);
	}
}
onMounted(async () => {
	loadingRef.value = true;
	const initData = await props.init();
	setData(initData);
});
</script>

<template>
	<div>
		<n-data-table
			remote
			:columns="columns"
			:data="dataRef"
			:loading="loadingRef"
			:pagination="pagination"
			:bordered="false"
			@update:page="handlePageChange"
		/>
	</div>
</template>

<style module lang="scss">
.singers__container {
	@include ellipsis;
}
td {
	cursor: pointer;
}
.icon__container {
	height: 20px;
}
.icon {
	color: $text_color;
	fill: $text_color;
	transition: transform 0.1s ease;
	will-change: transform;
	margin: 0 3px;
	&:hover {
		color: $primary;
		transform: scale(1.08);
	}
}
</style>
