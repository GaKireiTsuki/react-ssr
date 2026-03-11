import type { Action } from "@finesoft/front";
import type { AboutPage as AboutPageData } from "../data/types";

interface AboutPageProps {
	page: AboutPageData;
	onAction?: (action: Action) => void;
}

export function AboutPage({ page, onAction: _onAction }: AboutPageProps) {
	return (
		<div className="page about-page">
			<section className="page-header">
				<h1>关于框架</h1>
			</section>

			<div className="about-content">
				<div className="about-bio">
					<p>{page.bio}</p>
				</div>

				<div className="about-skills">
					<h2>技术栈</h2>
					<div className="skills-grid">
						{page.skills.map((skill) => (
							<div key={skill} className="skill-badge">
								{skill}
							</div>
						))}
					</div>
				</div>

				<div className="about-architecture">
					<h2>框架架构</h2>
					<div className="arch-flow">
						<div className="arch-step">
							<div className="arch-step-icon">🌐</div>
							<div className="arch-step-label">URL 请求</div>
						</div>
						<div className="arch-arrow">→</div>
						<div className="arch-step">
							<div className="arch-step-icon">🗺️</div>
							<div className="arch-step-label">Router</div>
						</div>
						<div className="arch-arrow">→</div>
						<div className="arch-step">
							<div className="arch-step-icon">🎯</div>
							<div className="arch-step-label">Intent</div>
						</div>
						<div className="arch-arrow">→</div>
						<div className="arch-step">
							<div className="arch-step-icon">🏗️</div>
							<div className="arch-step-label">Controller</div>
						</div>
						<div className="arch-arrow">→</div>
						<div className="arch-step">
							<div className="arch-step-icon">📄</div>
							<div className="arch-step-label">Page Data</div>
						</div>
						<div className="arch-arrow">→</div>
						<div className="arch-step">
							<div className="arch-step-icon">⚛️</div>
							<div className="arch-step-label">React Render</div>
						</div>
					</div>
				</div>

				<div className="about-ssr-info">
					<h2>SSR 工作流</h2>
					<div className="ssr-steps">
						<div className="ssr-step">
							<span className="ssr-step-num">1</span>
							<div>
								<h3>服务端渲染</h3>
								<p>
									createSSRRender → Framework.dispatch →
									Controller.execute → renderToString
								</p>
							</div>
						</div>
						<div className="ssr-step">
							<span className="ssr-step-num">2</span>
							<div>
								<h3>数据序列化</h3>
								<p>
									serializeServerData 将预取数据嵌入 HTML
									script 标签
								</p>
							</div>
						</div>
						<div className="ssr-step">
							<span className="ssr-step-num">3</span>
							<div>
								<h3>客户端 Hydration</h3>
								<p>
									startBrowserApp → deserializeServerData →
									PrefetchedIntents 缓存命中
								</p>
							</div>
						</div>
						<div className="ssr-step">
							<span className="ssr-step-num">4</span>
							<div>
								<h3>SPA 导航</h3>
								<p>
									FlowAction → ActionDispatcher → History 管理
									→ 页面更新
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
