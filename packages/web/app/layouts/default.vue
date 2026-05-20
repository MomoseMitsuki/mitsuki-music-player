<script lang="ts" setup>
import LeftSideBar from "@/views/LeftSideBar.vue";
import TopHeader from "@/views/TopHeader.vue";
import MusicView from "@/views/MusicView.vue";
import RightSideBar from "../views/RightSideBar.vue";
</script>

<template>
	<div class="layout__container">
		<n-layout has-sider>
			<LeftSideBar />
			<n-layout>
				<TopHeader />
				<n-layout-content class="page__container">
					<n-layout
						has-sider
						sider-placement="right"
						style="overflow: hidden"
					>
						<n-layout-content class="content__container">
							<slot></slot>
						</n-layout-content>
						<RightSideBar />
					</n-layout>
				</n-layout-content>
			</n-layout>
		</n-layout>
		<MusicView />
	</div>
</template>

<style scoped>
.layout__container {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.page__container {
	height: calc(100vh - 150px);
	box-shadow:
		0 0 1px rgba(255, 255, 255, 0.9),
		0 8px 24px rgba(233, 208, 225, 0.18),
		0 2px 6px rgba(220, 190, 210, 0.12);
	overflow: hidden;
}
.content__container {
	height: calc(100vh - 150px);
	background-color: #fbfbfd;
}
</style>
