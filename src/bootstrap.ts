import { defineRoutes, type Framework } from "@finesoft/front";
import { AboutController } from "./controllers/about-controller";
import { HomeController } from "./controllers/home-controller";
import { ProjectDetailController } from "./controllers/project-detail-controller";
import { ProjectsController } from "./controllers/projects-controller";
import { ProjectApiClient } from "./data/api-client";
import { COUNTRY_CODES } from "./locale";

/**
 * bootstrapApp — 注册所有路由和依赖
 *
 * 使用 defineRoutes 声明式注册路由 + Controller，
 * 使用 Container 注册 API Client 服务。
 *
 * 国家代码路由: 每条路由同时注册为 /:locale 前缀版本，
 * 例如 /projects 和 /cn/projects 都指向同一个 Controller。
 */
export function bootstrapApp(
	framework: Framework,
	options: { mockDelay?: number } = {},
): void {
	// 1. DI 容器 — 注册 API Client
	framework.container.register(
		"api",
		() => new ProjectApiClient({ mockDelay: options.mockDelay }),
		true, // singleton
	);

	// 2. 路由定义（无国家码前缀）
	const baseRoutes = [
		{
			path: "/",
			intentId: "home",
			controller: new HomeController(),
		},
		{
			path: "/projects",
			intentId: "projects",
			controller: new ProjectsController(),
		},
		{
			path: "/projects/:id",
			intentId: "project-detail",
			controller: new ProjectDetailController(),
		},
		{
			path: "/about",
			intentId: "about",
			controller: new AboutController(),
		},
	];

	// 3. 生成国家代码路由 (/:locale/...)
	const countryRoutes = COUNTRY_CODES.flatMap((country) =>
		baseRoutes.map((route) => ({
			path:
				route.path === "/"
					? `/${country}`
					: `/${country}${route.path}`,
			intentId: route.intentId,
			// 同 intentId 不需要重复注册 controller
		})),
	);

	// 4. 声明式注册: 基础路由 + 国家代码路由
	defineRoutes(framework, [...baseRoutes, ...countryRoutes]);
}
