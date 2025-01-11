import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
		sourcemap: false,
	},
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: process.env.VITE_BASE_URL,
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
