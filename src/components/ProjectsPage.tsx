import type { Action } from "@finesoft/front";
import { projectDetailAction } from "../actions";
import type { ProjectsPage as ProjectsPageData } from "../data/types";
import { getCountryPrefix } from "../locale";

interface ProjectsPageProps {
	page: ProjectsPageData;
	onAction?: (action: Action) => void;
}

export function ProjectsPage({ page, onAction }: ProjectsPageProps) {
	// 动态基于 currentPath 推导国家代码
	const prefix = getCountryPrefix(page.url);

	const handleAction = (action: Action) => (e: React.MouseEvent) => {
		e.preventDefault();
		onAction?.(action);
	};

	return (
		<div className="page projects-page">
			<section className="page-header">
				<h1>所有项目</h1>
				<p className="page-description">
					展示 @finesoft/front 框架各模块能力的示例项目
				</p>
			</section>
			<div className="project-list">
				{page.projects.map((project) => (
					<a
						key={project.id}
						href={`${prefix}/projects/${project.id}`}
						className="project-list-item"
						onClick={handleAction(
							projectDetailAction(project.id, prefix),
						)}
					>
						<div className="project-list-icon">
							{project.imageUrl}
						</div>
						<div className="project-list-content">
							<h2 className="project-list-title">
								{project.title}
								{project.featured && (
									<span className="badge">精选</span>
								)}
							</h2>
							<p className="project-list-desc">
								{project.description}
							</p>
							<div className="project-card-tags">
								{project.tags.map((tag) => (
									<span key={tag} className="tag">
										{tag}
									</span>
								))}
							</div>
						</div>
						<span className="project-list-arrow">→</span>
					</a>
				))}
			</div>
		</div>
	);
}
