import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: process.env.mode === "production" ? "/static/" : "/",
	root: "",
	resolve: {
		alias: {
			"@": path.resolve(fileURLToPath(new URL("./src", import.meta.url))),
			"node_modules": path.resolve(__dirname, "./node_modules"),
		}
	},
	build: {
		outDir: path.resolve(__dirname, "../static/genxapi/dist/"), // Output to a directory in STATICFILES_DIRS
		assetsDir: "assets", // Set it to an empty string to flatten the output structure
		manifest: true, // Generate manifest.json file
		rollupOptions: {
			output: {},

		},
	},
	server: {
		port: 3000,
		open: false,
		origin: "http://127.0.0.1:8000",
	},
})
