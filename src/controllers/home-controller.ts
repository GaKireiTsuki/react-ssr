import { BaseController, type Container } from "@finesoft/front";
import type { ProjectApiClient } from "../data/api-client";
import type { HomePage } from "../data/types";

export class HomeController extends BaseController<
	Record<string, string>,
	HomePage
> {
	readonly intentId = "home";

	async execute(_params: Record<string, string>, container: Container) {
		const api = container.resolve<ProjectApiClient>("api");
		const featuredProjects = await api.getFeaturedProjects();

		return {
			id: "home",
			pageType: "home" as const,
			title: "首页 — Finesoft Front 演示",
			description: "基于 @finesoft/front 构建的全栈 SSR 演示应用",
			url: "/",
			featuredProjects,
		};
	}
}
