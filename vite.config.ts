import { finesoftFrontViteConfig } from "@finesoft/front";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		finesoftFrontViteConfig({
			locales: ["zh-CN", "en-US"],
			defaultLocale: "zh-CN",
			ssr: { entry: "src/ssr.tsx" },
			adapter: "auto", // 本地和独立 Docker 运行的默认适配器
		}),
	],
});
