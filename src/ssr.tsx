import type { BasePage } from "@finesoft/front";
import { createSSRRender, serializeServerData } from "@finesoft/front";
import { renderToString } from "react-dom/server";
import { bootstrapApp } from "./bootstrap";
import { Layout } from "./components/Layout";
import { PageRenderer } from "./components/PageRenderer";
import type { AppPage } from "./data/types";

export const render = createSSRRender({
	bootstrap: (framework) => bootstrapApp(framework, { mockDelay: 0 }),
	getErrorPage: (status: number, message: string) => ({
		id: "error",
		pageType: "error" as const,
		title: `Error ${status}`,
		description: message,
		status,
	}),
	renderApp: (page: BasePage, _locale: string) => {
		const appPage = page as AppPage;
		const html = renderToString(
			<Layout currentPath={appPage.url}>
				<PageRenderer page={appPage} />
			</Layout>,
		);
		return { html, head: "", css: "" };
	},
});

export { serializeServerData };
