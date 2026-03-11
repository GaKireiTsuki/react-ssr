import { HttpClient } from "@finesoft/front";
import { DEVELOPER_INFO, PROJECTS } from "./mock-data";
import type { Project } from "./types";

/**
 * 项目 API 客户端
 *
 * 继承 HttpClient 展示框架的 HTTP 抽象能力。
 * 当前使用 mock 数据，生产环境可切换为真实 API。
 */
export interface ApiClientOptions {
	mockDelay?: number;
}

export class ProjectApiClient extends HttpClient {
	private mockDelay: number;

	constructor(options: ApiClientOptions = {}) {
		super({
			baseUrl: "/api",
			defaultHeaders: { "Content-Type": "application/json" },
		});
		this.mockDelay = options.mockDelay ?? 800; // 默认 800ms
	}

	private async delay<T>(data: T, overrideDelay?: number): Promise<T> {
		const ms = overrideDelay ?? this.mockDelay;
		if (ms <= 0) return data;
		return new Promise((resolve) => setTimeout(() => resolve(data), ms));
	}

	async getProjects(): Promise<Project[]> {
		return this.delay(PROJECTS);
	}

	async getFeaturedProjects(): Promise<Project[]> {
		return this.delay(
			PROJECTS.filter((p) => p.featured),
			600,
		);
	}

	async getProject(id: string): Promise<Project | undefined> {
		return this.delay(
			PROJECTS.find((p) => p.id === id),
			500,
		);
	}

	async getDeveloperInfo() {
		return this.delay(DEVELOPER_INFO, 400);
	}
}
