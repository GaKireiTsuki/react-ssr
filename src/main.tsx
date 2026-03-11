import {
	startBrowserApp,
	type BasePage,
	type Framework,
} from "@finesoft/front";
import { createRoot } from "react-dom/client";
import { bootstrapApp } from "./bootstrap";
import { Layout } from "./components/Layout";
import { Loading } from "./components/Loading";
import { PageRenderer } from "./components/PageRenderer";
import type { AppPage } from "./data/types";
import "./index.css";

/**
 * 客户端入口 — 使用 startBrowserApp 一站式启动
 *
 * 展示框架能力:
 * - PrefetchedIntents 从 DOM 自动提取
 * - Framework 创建 + bootstrap
 * - mount 回调实现 React 渲染
 * - Action handlers 自动注册
 * - 初始页面自动触发
 * - 页面异步加载时显示 Loading
 */
startBrowserApp({
	bootstrap: bootstrapApp,
	mountId: "root",
	mount: (
		target: HTMLElement,
		{ framework }: { framework: Framework; locale: string },
	) => {
		let root: ReturnType<typeof createRoot> | null = null;
		let currentPage: AppPage | null = null;

		function render(
			page: AppPage | null,
			loading: boolean,
		) {
			const handleAction = (action: import("@finesoft/front").Action) => {
				framework.perform(action);
			};

			const element = (
				<Layout
					currentPath={page?.url ?? "/"}
					onAction={handleAction}
				>
					{loading && <Loading />}
					{page && <PageRenderer page={page} onAction={handleAction} />}
				</Layout>
			);

			if (!root) {
				root = createRoot(target);
			}
			root.render(element);
		}

		// 返回 updateApp 函数
		return ({
			page,
			isFirstPage,
		}: {
			page: Promise<BasePage> | BasePage;
			isFirstPage?: boolean;
		}) => {
			if (page instanceof Promise) {
				// 异步: 显示 loading（保留旧页面内容），等数据到达后更新
				if (!isFirstPage) {
					render(currentPage, true);
				}
				page.then((p) => {
					currentPage = p as AppPage;
					render(currentPage, false);
				});
			} else {
				// 同步: 直接渲染（首屏预取命中或 SSR 数据）
				currentPage = page as AppPage;
				render(currentPage, false);
			}
		};
	},
	callbacks: {
		onNavigate: (pathname: string) => {
			console.log("[Navigation]", pathname);
		},
		onModal: (page: BasePage) => {
			console.log("[Modal]", page.title);
		},
	},
});
