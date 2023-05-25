import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(fileURLToPath(new URL("./src", import.meta.url))),
			"node_modules": path.resolve(__dirname, "./node_modules"),
		}
	},
	build: {
		outDir: path.resolve(__dirname, "../static/vue"), // Output to a directory in STATICFILES_DIRS
		assetsDir: "", // Set it to an empty string to flatten the output structure
		manifest: true, // Generate manifest.json file
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "./index.html"), // Entry point of your application
			},
		},
	},
	server: {
		port: 3001,
		open: false,
		origin: "http://127.0.0.1:8080",
	},
})
