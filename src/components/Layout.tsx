import type { Action } from "@finesoft/front";
import { NAV_ACTIONS } from "../actions";
import { getCountryPrefix } from "../locale";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
	children: React.ReactNode;
	currentPath?: string;
	onAction?: (action: Action) => void;
}

/** 公共布局 — 顶部导航栏 + 内容区 */
export function Layout({ children, currentPath = "/", onAction }: LayoutProps) {
	// 动态基于 currentPath 推导国家代码
	const prefix = getCountryPrefix(currentPath);

	const handleNav = (action: Action) => (e: React.MouseEvent) => {
		e.preventDefault();
		onAction?.(action);
	};

	const navItems = [
		{
			label: "首页",
			action: NAV_ACTIONS.home(prefix),
			path: `${prefix}/`,
		},
		{
			label: "项目",
			action: NAV_ACTIONS.projects(prefix),
			path: `${prefix}/projects`,
		},
		{
			label: "关于",
			action: NAV_ACTIONS.about(prefix),
			path: `${prefix}/about`,
		},
	];

	return (
		<div className="app-layout">
			<nav className="nav-bar">
				<div className="nav-container">
					<a
						href="/"
						className="nav-brand"
						onClick={handleNav(NAV_ACTIONS.home(prefix))}
					>
						<span className="brand-icon">◆</span>
						<span className="brand-text">Finesoft Front</span>
					</a>
					<div className="nav-links">
						{navItems.map((item) => (
							<a
								key={item.path}
								href={item.path}
								className={`nav-link ${currentPath === item.path ? "active" : ""}`}
								onClick={handleNav(item.action)}
							>
								{item.label}
							</a>
						))}
						<a
							href="https://github.com/nicepkg/finesoft"
							className="nav-link nav-external"
							onClick={handleNav(NAV_ACTIONS.github)}
						>
							GitHub ↗
						</a>
						<ThemeToggle />
					</div>
				</div>
			</nav>
			<main className="main-content">{children}</main>
			<footer className="footer">
				<p>
					Built with <strong>@finesoft/front</strong> — SSR + Router +
					DI + Actions
				</p>
			</footer>
		</div>
	);
}
