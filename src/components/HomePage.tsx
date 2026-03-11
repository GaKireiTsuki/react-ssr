import type { Action } from "@finesoft/front";
import { NAV_ACTIONS, projectDetailAction } from "../actions";
import type { HomePage as HomePageData } from "../data/types";
import { getCountryPrefix } from "../locale";

interface HomePageProps {
	page: HomePageData;
	onAction?: (action: Action) => void;
}

export function HomePage({ page, onAction }: HomePageProps) {
	// 动态基于 currentPath 推导国家代码
	const prefix = getCountryPrefix(page.url);

	const handleAction = (action: Action) => (e: React.MouseEvent) => {
		e.preventDefault();
		onAction?.(action);
	};

	return (
		<div className="page home-page">
			<section className="hero">
				<div className="hero-content">
					<h1 className="hero-title">
						<span className="hero-highlight">@finesoft/front</span>
						<br />
						全栈 SSR 框架演示
					</h1>
					<p className="hero-subtitle">
						Router · DI Container · Actions · SSR · 一站式服务器
					</p>
					<div className="hero-actions">
						<a
							href={`${prefix}/projects`}
							className="btn btn-primary"
							onClick={handleAction(NAV_ACTIONS.projects(prefix))}
						>
							浏览项目 →
						</a>
						<a
							href={`${prefix}/about`}
							className="btn btn-secondary"
							onClick={handleAction(NAV_ACTIONS.about(prefix))}
						>
							了解框架
						</a>
					</div>
				</div>
			</section>

			<section className="section">
				<h2 className="section-title">精选项目</h2>
				<div className="project-grid">
					{page.featuredProjects.map((project) => (
						<a
							key={project.id}
							href={`${prefix}/projects/${project.id}`}
							className="project-card"
							onClick={handleAction(
								projectDetailAction(project.id, prefix),
							)}
						>
							<div className="project-card-icon">
								{project.imageUrl}
							</div>
							<h3 className="project-card-title">
								{project.title}
							</h3>
							<p className="project-card-desc">
								{project.description}
							</p>
							<div className="project-card-tags">
								{project.tags.map((tag) => (
									<span key={tag} className="tag">
										{tag}
									</span>
								))}
							</div>
						</a>
					))}
				</div>
			</section>

			<section className="section features-section">
				<h2 className="section-title">框架能力</h2>
				<div className="features-grid">
					{[
						{
							icon: "🗺️",
							title: "Intent Router",
							desc: "URL → Intent → Controller → Data 分层路由",
						},
						{
							icon: "📦",
							title: "DI Container",
							desc: "轻量依赖注入，单例/工厂模式",
						},
						{
							icon: "⚡",
							title: "Action System",
							desc: "声明式导航，FlowAction + ExternalUrl",
						},
						{
							icon: "🖥️",
							title: "SSR Pipeline",
							desc: "服务端渲染 + 数据序列化 + Hydration",
						},
						{
							icon: "🏗️",
							title: "BaseController",
							desc: "execute/fallback 模式，标准化数据获取",
						},
						{
							icon: "🌐",
							title: "HttpClient",
							desc: "类型安全 HTTP 客户端基类",
						},
					].map((feature) => (
						<div key={feature.title} className="feature-card">
							<div className="feature-icon">{feature.icon}</div>
							<h3 className="feature-title">{feature.title}</h3>
							<p className="feature-desc">{feature.desc}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
