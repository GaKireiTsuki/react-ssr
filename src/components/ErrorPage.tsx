import type { Action } from "@finesoft/front";
import { NAV_ACTIONS } from "../actions";
import type { ErrorPage as ErrorPageData } from "../data/types";
import { getCountryPrefix } from "../locale";

interface ErrorPageProps {
	page: ErrorPageData;
	onAction?: (action: Action) => void;
}

export function ErrorPage({ page, onAction }: ErrorPageProps) {
	// 动态基于 currentPath 推导国家代码
	const prefix = getCountryPrefix(page.url);

	const handleGoHome = (e: React.MouseEvent) => {
		e.preventDefault();
		onAction?.(NAV_ACTIONS.home(prefix));
	};

	return (
		<div className="page error-page">
			<div className="error-content">
				<div className="error-code">{page.status || 404}</div>
				<h1>{page.title}</h1>
				<p>{page.description || "页面未找到"}</p>
				<a href="/" className="btn btn-primary" onClick={handleGoHome}>
					返回首页
				</a>
			</div>
		</div>
	);
}
