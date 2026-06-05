import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: false },
	app: {
		pageTransition: { name: "page", mode: "out-in" },
		layoutTransition: { name: "page", mode: "out-in" },

		// https://github.com/nuxt/nuxt/issues/26565#issuecomment-3448517709
		baseURL: "/",
		head: {
			titleTemplate: "%s - 『 花 逢 坂 町 』 🌸 音乐演绎厅"
		}
	},
	runtimeConfig: {
		public: {
			apiPrefix:
				process.env.NUXT_PUBLIC_API_MODE === "mock" ? "mock" : "api",
			backendOrigin: process.env.NUXT_PUBLIC_BACKEND_ORIGIN,
			imageUrl: process.env.NUXT_PUBLIC_IMAGE_URL
		}
	},
	imports: {
		dirs: ["stores", "views", "constant", "components/command"],
		scan: true
	},
	components: [
		"components/",
		"components/table",
		"components/card",
		"components/page",
		"components/hoc"
	],
	vite: {
		plugins: [
			AutoImport({
				imports: [
					{
						"naive-ui": [
							"useDialog",
							"useMessage",
							"useNotification",
							"useLoadingBar"
						]
					}
				]
			}),
			Components({
				resolvers: [NaiveUiResolver()]
			})
		],
		optimizeDeps: {
			include: ["@css-render/vue3-ssr"]
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
                        @use "~/assets/styles/index.scss" as *;
                    `
				}
			}
		}
	},
	modules: [
		"@nuxt/image",
		"@pinia/nuxt",
		// "@nuxtjs/seo",
		"@nuxt/icon"
	],
	devServer: {
		host: "127.0.0.1",
		port: 2333
	},
	build: {
		transpile: ["naive-ui", "vueuc"]
	},
	// ogImage: {
	// 	enabled: false
	// },
	icon: {
		mode: "svg"
	}
});
