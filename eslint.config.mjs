import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const ignores = [
	"**/dist/**",
	"**/.output/**",
	"**/.nuxt/**",
	"**/node_modules/**",
	".*",
	"scripts/**",
	"**/*.d.ts"
];

export default defineConfig(
	{
		ignores
	},
	{
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			eslintConfigPrettier
		],
		plugins: {
			prettier: eslintPluginPrettier
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tseslint.parser
		},
		rules: {
			"no-var": "error"
		}
	},
	{
		files: ["packages/web/**/*.{ts,js,tsx,jsx,vue}"],
		extends: [
			...eslintPluginVue.configs["flat/recommended"],
			eslintConfigPrettier
		],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				sourceType: "module",
				parser: tseslint.parser,
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser
			}
		},
		rules: {
			"vue/multi-word-component-names": "off",
			"no-undef": "off"
		}
	},
	// {
	// 	ignores,
	// 	files: ["packages/admin/**/*.{ts,js,tsx,jsx}"],
	// 	extends: [
	// 		reactHooks.configs.flat.recommended,
	// 		reactRefresh.configs.vite
	// 	],
	// 	languageOptions: { globals: { ...globals.browser } }
	// },
	{
		files: ["packages/backend/**/*.{ts,js}"],
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	}
);
