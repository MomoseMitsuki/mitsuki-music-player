import $style from "./styles/create-playlist.module.scss";
import type { DialogOptions, DialogApi } from "naive-ui";
import { Icon } from "#components";
import { NFlex, NCheckbox } from "naive-ui";

export function useCreatePlayListDialog(dialog: DialogApi) {
	const name = ref("");
	const isPublic = ref(true);

	function show() {
		name.value = "";
		isPublic.value = true;
		function submitCreatePlayList(e: MouseEvent) {
			e.stopPropagation();
			dialogRef.destroy();
		}

		function cancelCreatePlaylist(e: MouseEvent) {
			e.stopPropagation();
			dialogRef.destroy();
		}
		const options: DialogOptions = {
			icon() {
				return (
					<Icon
						name="mdi:information"
						size="35"
						class={$style.playlist__icon}
					/>
				);
			},
			title() {
				return <h3 class={$style.playlist__title}>新建歌单</h3>;
			},
			content() {
				return (
					<div class={$style.playlist__container}>
						<div style="margin-bottom: 10px;">
							<input
								type="text"
								spellcheck="false"
								placeholder="请输入歌单名..."
							/>
						</div>
						<NCheckbox size="small" label="设为隐私歌单" />
					</div>
				);
			},
			action() {
				return (
					<NFlex style={{ width: "100%" }} align="center">
						<button
							class={`primary ${$style.playlist__btn}`}
							onClick={submitCreatePlayList}
						>
							确认
						</button>
						<button
							class={$style.playlist__btn}
							onClick={cancelCreatePlaylist}
						>
							取消
						</button>
					</NFlex>
				);
			}
		};
		const dialogRef = dialog.info(options);
	}
	return { show };
}
