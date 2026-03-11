import type { AppPage } from "../data/types";
import { AboutPage } from "./AboutPage";
import { ErrorPage } from "./ErrorPage";
import { HomePage } from "./HomePage";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { ProjectsPage } from "./ProjectsPage";

interface PageRendererProps {
	page: AppPage;
	onAction?: (action: import("@finesoft/front").Action) => void;
}

/** 根据 pageType 分发渲染对应组件 */
export function PageRenderer({ page, onAction }: PageRendererProps) {
	switch (page.pageType) {
		case "home":
			return <HomePage page={page} onAction={onAction} />;
		case "projects":
			return <ProjectsPage page={page} onAction={onAction} />;
		case "project-detail":
			return <ProjectDetailPage page={page} onAction={onAction} />;
		case "about":
			return <AboutPage page={page} onAction={onAction} />;
		case "error":
			return <ErrorPage page={page} onAction={onAction} />;
		default:
			return (
				<ErrorPage
					page={{
						id: "unknown",
						pageType: "error",
						title: "Unknown Page",
						status: 500,
					}}
				/>
			);
	}
}
