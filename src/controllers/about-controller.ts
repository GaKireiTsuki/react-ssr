import { BaseController, type Container } from "@finesoft/front";
import type { ProjectApiClient } from "../data/api-client";
import type { AboutPage } from "../data/types";

export class AboutController extends BaseController<
	Record<string, string>,
	AboutPage
> {
	readonly intentId = "about";

	async execute(_params: Record<string, string>, container: Container) {
		const api = container.resolve<ProjectApiClient>("api");
		const info = await api.getDeveloperInfo();

		return {
			id: "about",
			pageType: "about" as const,
			title: "关于 — Finesoft Front 演示",
			description: info.bio,
			url: "/about",
			skills: info.skills,
			bio: info.bio,
		};
	}
}
