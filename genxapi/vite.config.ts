import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./frontend", import.meta.url))
		},
		extensions: [".js", ".ts", ".tsx", ".jsx", ".vue"],
	},
	build: {
		rollupOptions: {
			// Overwrite default .html entry to main.ts in the static directory
			input: resolve("./frontend/main.ts"),
		},
	}
})
