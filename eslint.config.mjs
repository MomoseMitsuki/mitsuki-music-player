import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ignores = [
	"**/dist/**",
	"**/.output/**",
	"**/.nuxt/**",
	"**/node_modules/**",
	".*",
	"scripts/**",
	"**/*.d.ts",
	"eslint.config.mjs",
	"prettier.config.mjs"
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
			parser: tseslint.parser,
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: "./tsconfig.json",
				extraFileExtensions: [".vue"]
			}
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
	{
		files: ["packages/backend/**/*.{ts,js,mts,mjs,mjs,cjs}"],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			eslintConfigPrettier
		],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			},
			sourceType: "commonjs",
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: "./tsconfig.json"
			}
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-unsafe-argument": "warn"
		}
	}
);
