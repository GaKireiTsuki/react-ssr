import type { BasePage } from "@finesoft/front";

/** 项目数据 */
export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	imageUrl: string;
	githubUrl?: string;
	demoUrl?: string;
	featured?: boolean;
	detail: string;
}

/** 首页 */
export interface HomePage extends BasePage {
	pageType: "home";
	featuredProjects: Project[];
}

/** 项目列表页 */
export interface ProjectsPage extends BasePage {
	pageType: "projects";
	projects: Project[];
}

/** 项目详情页 */
export interface ProjectDetailPage extends BasePage {
	pageType: "project-detail";
	project: Project;
}

/** 关于页 */
export interface AboutPage extends BasePage {
	pageType: "about";
	skills: string[];
	bio: string;
}

/** 错误页 */
export interface ErrorPage extends BasePage {
	pageType: "error";
	status: number;
}

/** 所有页面类型联合 */
export type AppPage =
	| HomePage
	| ProjectsPage
	| ProjectDetailPage
	| AboutPage
	| ErrorPage;
