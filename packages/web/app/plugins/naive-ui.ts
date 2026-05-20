import { defineNuxtPlugin } from "#imports";
import { setup } from "@css-render/vue3-ssr";

// https://github.com/tusen-ai/naive-ui/issues/5326#issuecomment-3076836497
export default defineNuxtPlugin(_nuxtApp => {
	const { collect } = setup(_nuxtApp.vueApp);
	if (import.meta.server) {
		useHead({
			style: () =>
				collect()
					.split("</style>")
					.map(block => {
						const id = /cssr-id="(.+?)"/.exec(block)?.[1];
						const style = (/>(.*)/s.exec(block)?.[1] ?? "").trim();
						return {
							"cssr-id": id,
							innerHTML: style
						};
					})
		});
	}
});
