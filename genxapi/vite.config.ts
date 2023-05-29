// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.mode === "production" ? "/static/" : "http://localhost:3000/",
	plugins: [
		vue({
			template: { transformAssetUrls }
		}),
		// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
		vuetify({
			autoImport: true,
			styles: {
				configFile: "frontend/styles/settings.scss",
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./frontend", import.meta.url))
		},
		extensions: [
			".js",
			".json",
			".jsx",
			".mjs",
			".ts",
			".tsx",
			".vue",
		],
	},
	server: {
		port: 3000,
	},
	build: {
		manifest: true,
		rollupOptions: {
			// Overwrite default .html entry to main.ts in the static directory
			input: resolve("./frontend/main.ts"),
		},
	}
})
