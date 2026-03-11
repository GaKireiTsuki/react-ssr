import { makeExternalUrlAction, type Action } from "@finesoft/front";
import { NAV_ACTIONS } from "../actions";
import type { ProjectDetailPage as ProjectDetailPageData } from "../data/types";
import { getCountryPrefix } from "../locale";

interface ProjectDetailPageProps {
	page: ProjectDetailPageData;
	onAction?: (action: Action) => void;
}

export function ProjectDetailPage({ page, onAction }: ProjectDetailPageProps) {
	const { project } = page;

	// 动态基于 currentPath 推导国家代码
	const prefix = getCountryPrefix(page.url);

	const handleAction = (action: Action) => (e: React.MouseEvent) => {
		e.preventDefault();
		onAction?.(action);
	};

	return (
		<div className="page detail-page">
			<div className="detail-header">
				<a
					href={`${prefix}/projects`}
					className="back-link"
					onClick={handleAction(NAV_ACTIONS.projects(prefix))}
				>
					← 返回项目列表
				</a>
			</div>

			<article className="detail-content">
				<div className="detail-icon">{project.imageUrl}</div>
				<h1 className="detail-title">{project.title}</h1>
				<p className="detail-desc">{project.description}</p>

				<div className="detail-tags">
					{project.tags.map((tag) => (
						<span key={tag} className="tag tag-lg">
							{tag}
						</span>
					))}
				</div>

				<div className="detail-body">
					<p>{project.detail}</p>
				</div>

				<div className="detail-links">
					{project.githubUrl && (
						<a
							href={project.githubUrl}
							className="btn btn-secondary"
							onClick={handleAction(
								makeExternalUrlAction(project.githubUrl),
							)}
						>
							GitHub ↗
						</a>
					)}
					{project.demoUrl && (
						<a
							href={project.demoUrl}
							className="btn btn-primary"
							onClick={handleAction(
								makeExternalUrlAction(project.demoUrl),
							)}
						>
							在线演示 ↗
						</a>
					)}
				</div>
			</article>
		</div>
	);
}
