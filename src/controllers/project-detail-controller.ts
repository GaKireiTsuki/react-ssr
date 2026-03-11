import { BaseController, type Container } from "@finesoft/front";
import type { ProjectApiClient } from "../data/api-client";
import type { ProjectDetailPage } from "../data/types";

export class ProjectDetailController extends BaseController<
	{ id: string },
	ProjectDetailPage
> {
	readonly intentId = "project-detail";

	async execute(params: { id: string }, container: Container) {
		const api = container.resolve<ProjectApiClient>("api");
		const project = await api.getProject(params.id);

		if (!project) {
			throw new Error(`Project not found: ${params.id}`);
		}

		return {
			id: `project-${params.id}`,
			pageType: "project-detail" as const,
			title: `${project.title} — Finesoft Front 演示`,
			description: project.description,
			url: `/projects/${params.id}`,
			project,
		};
	}

	/** BaseController fallback — 项目未找到时返回错误页 */
	fallback(params: { id: string }, error: Error): ProjectDetailPage {
		return {
			id: `project-${params.id}`,
			pageType: "project-detail" as const,
			title: "项目未找到",
			description: error.message,
			url: `/projects/${params.id}`,
			project: {
				id: params.id,
				title: "未找到",
				description: error.message,
				tags: [],
				imageUrl: "❌",
				detail: "请求的项目不存在，请返回项目列表。",
			},
		};
	}
}
