<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
	common: {
		bodyColor: "transparent",
		baseColor: "transparent"
	},
	Layout: {
		textColor: "#867982",
		color: "transparent",
		siderColor: "transparent",
		bodyColor: "transparent",
		baseColor: "transparent",
		borderColor: "none"
	},
	Slider: {
		fillColor: "#EC4B86",
		fillColorHover: "#EC4B86",
		railColor: "#FEF2F5",
		railColorHover: "#FEF2F5",
		handleSize: "12px"
	},
	DataTable: {
		loadingColor: "#ed448e",
		tdColor: "#FBFBFD",
		tdColorHover: "#F7F6FB"
	},
	Pagination: {
		itemTextColor: "#514E60",
		itemTextColorHover: "#ed448e",
		itemBorder: "0px",
		itemBorderHover: "0px",
		itemColor: "transparent",
		itemColorHover: "#FBEDF6",
		itemTextColorActive: "#ed448e",
		itemBorderActive: "0px",
		itemColorActive: "#FBEDF6",
		itemColorActiveHover: "#FBEDF6"
	},
	Checkbox: {
		checkMarkColor: "white",
		colorChecked: "#ed448e",
		boxShadowFocus: "none",
		border: "1px solid #514e60",
		borderChecked: "1px solid #ed448e",
		borderFocus: "1px solid #ed448e"
	},
	Dialog: {
		closeColorHover: "transparent"
	},
	Input: {
		borderHover: "1px solid #ed448e",
		borderFocus: "1px solid #ed448e",
		boxShadowFocus: "",
		caretColor: "#ed448e"
	},
	Radio: {
		dotColorActive: "#ed448e",
		boxShadowFocus: "inset 0 0 0 1px rgb(224, 224, 230)",
		boxShadowHover: "inset 0 0 0 1px #ed448e",
		boxShadowActive: "inset 0 0 0 1px #ed448e"
	},
	Popover: {}
};

onMounted(() => {
	useInit();
});
</script>

<template>
	<NConfigProvider inline-theme-disabled :theme-overrides="themeOverrides">
		<NMessageProvider>
			<NNotificationProvider>
				<NLoadingBarProvider>
					<NDialogProvider>
						<NuxtLayout>
							<NuxtPage />
						</NuxtLayout>
					</NDialogProvider>
				</NLoadingBarProvider>
			</NNotificationProvider>
		</NMessageProvider>
	</NConfigProvider>
</template>

<style lang="scss">
.art-notice {
	display: none !important;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "思源宋体";
	&::-webkit-scrollbar {
		width: 6px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background-color: #777490;
	}
	&::-webkit-scrollbar-thumb:hover {
		border-radius: 3px;
		background-color: #777490;
	}
}

body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

button {
	margin-right: 40px;
	padding: 8px 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 0px;
	background: transparent;
	border-radius: 10px;
	box-shadow:
		2px 0 5px #ece9f1,
		0 2px 5px #ece9f1,
		-2px 0 5px #ece9f1,
		0 -2px 5px #ece9f1;
	&.n-dialog__close {
		box-shadow: none;
		&:hover {
			transform: scale(1.08);
			box-shadow: none;
		}
	}
	transition: transform 0.1s ease;
	user-select: none;
	&:focus-visible {
		outline: 0px;
	}
	&.primary {
		background-color: $primary;
		color: #fefefe;
	}
	&:hover {
		transform: translateY(-2px);
		box-shadow:
			3px 0 10px #ece9f1,
			0 3px 10px #ece9f1,
			-3px 0 10px #ece9f1,
			0 -3px 10px #ece9f1;
	}
	&:active {
		transform: translateY(1px);
	}
	svg {
		margin-right: 5px;
	}
}
.page-enter-active,
.page-leave-active {
	transition: all 0.2s ease;
	will-change: transform, opacity;
}

.page-enter-from {
	opacity: 0;
	transform: translateY(20px);
}
.page-enter-to {
	opacity: 1;
	transform: translateY(0);
}

.page-leave-from {
	opacity: 1;
	transform: translateY(0);
}
.page-leave-to {
	opacity: 0;
	transform: translateY(20px);
}

.lyric-enter-active,
.lyric-leave-active {
	transition: all 0.5s ease;
	will-change: transform;
}

.lyric-enter-to,
.lyric-leave-from {
	transform: translateY(0);
}

.lyric-enter-from,
.lyric-leave-to {
	transform: translateY(100vh);
}
</style>
