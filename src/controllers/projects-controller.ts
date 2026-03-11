import { BaseController, type Container } from "@finesoft/front";
import type { ProjectApiClient } from "../data/api-client";
import type { ProjectsPage } from "../data/types";

export class ProjectsController extends BaseController<
	Record<string, string>,
	ProjectsPage
> {
	readonly intentId = "projects";

	async execute(_params: Record<string, string>, container: Container) {
		const api = container.resolve<ProjectApiClient>("api");
		const projects = await api.getProjects();

		return {
			id: "projects",
			pageType: "projects" as const,
			title: "项目列表 — Finesoft Front 演示",
			description: "使用 @finesoft/front 框架构建的所有演示项目",
			url: "/projects",
			projects,
		};
	}
}
