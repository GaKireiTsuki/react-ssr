import type { Action } from "@finesoft/front";
import { makeExternalUrlAction, makeFlowAction } from "@finesoft/front";

/** 创建指向项目详情的 FlowAction */
export function projectDetailAction(id: string, prefix = ""): Action {
	return makeFlowAction(`${prefix}/projects/${id}`);
}

/** 导航 Actions */
export const NAV_ACTIONS = {
	home: (prefix = "") => makeFlowAction(`${prefix}/`),
	projects: (prefix = "") => makeFlowAction(`${prefix}/projects`),
	about: (prefix = "") => makeFlowAction(`${prefix}/about`),
	github: makeExternalUrlAction("https://github.com/nicepkg/finesoft"),
} as const;
