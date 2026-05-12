// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: false },
	app: {
		pageTransition: { name: "page", mode: "out-in" },
		layoutTransition: { name: "page", mode: "out-in" },

		// https://github.com/nuxt/nuxt/issues/26565#issuecomment-3448517709
		baseURL: "/"
	},
	modules: ["nuxtjs-naive-ui", "@nuxt/image", "@pinia/nuxt", "@nuxtjs/seo"],
	devServer: {
		host: "127.0.0.1",
		port: 2333
	}
});
