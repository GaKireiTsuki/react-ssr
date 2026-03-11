import type { Project } from "./types";

export const PROJECTS: Project[] = [
	{
		id: "ssr-framework",
		title: "SSR Framework",
		description: "基于 Hono + Vite 的全栈 SSR 框架，支持 React/Svelte/Vue",
		tags: ["TypeScript", "SSR", "Hono", "Vite"],
		imageUrl: "🚀",
		githubUrl: "https://github.com/example/ssr-framework",
		demoUrl: "https://ssr-demo.example.com",
		featured: true,
		detail: "一个现代化的全栈 SSR 框架，基于 Hono 作为 HTTP 服务器，Vite 处理构建和开发，支持多种前端框架。内置路由系统、依赖注入容器、Intent/Action 导航模型，以及服务端数据预取机制。支持 Node.js / Deno / Bun 多运行时部署。",
	},
	{
		id: "intent-router",
		title: "Intent Router",
		description: "意图驱动的 URL 路由器，支持参数化路径匹配",
		tags: ["Router", "TypeScript", "SPA"],
		imageUrl: "🗺️",
		githubUrl: "https://github.com/example/intent-router",
		featured: true,
		detail: "区别于传统路由器的 URL → Component 映射，Intent Router 采用 URL → Intent → Controller → Data 的分层架构。每个 Intent 代表一个用户意图，由对应的 Controller 处理业务逻辑。这种设计解耦了 URL 结构和页面渲染，支持 SSR 数据预取和客户端缓存。",
	},
	{
		id: "di-container",
		title: "DI Container",
		description: "轻量级依赖注入容器，支持单例和工厂模式",
		tags: ["DI", "IoC", "TypeScript"],
		imageUrl: "📦",
		featured: true,
		detail: "零依赖的轻量级 DI 容器，核心代码不到 50 行。支持单例（singleton）和工厂（factory）两种注册模式。通过字符串 key 注册和解析依赖，适用于服务端和客户端。Framework 类内置容器实例，自动注册 Logger、Net、Locale 等基础依赖。",
	},
	{
		id: "action-system",
		title: "Action System",
		description: "声明式 Action 分发系统，统一处理 SPA 导航和外部链接",
		tags: ["Navigation", "Actions", "SPA"],
		imageUrl: "⚡",
		detail: "Action 系统将用户交互抽象为声明式对象：FlowAction（SPA 路由导航）、ExternalUrlAction（外部链接）、CompoundAction（组合操作）。ActionDispatcher 按 kind 分发到对应 handler，支持模态窗口、历史管理、滚动恢复等高级功能。",
	},
	{
		id: "http-client",
		title: "HTTP Client",
		description: "类型安全的 HTTP 客户端基类，自动 JSON 处理和错误封装",
		tags: ["HTTP", "API", "TypeScript"],
		imageUrl: "🌐",
		githubUrl: "https://github.com/example/http-client",
		detail: "抽象 HTTP 客户端基类，子类只需定义业务端点。内置 URL 拼接、默认 headers 合并、JSON 序列化/反序列化、非 2xx 状态码自动抛出 HttpError。支持自定义 fetch 实现，便于测试和 SSR 场景。",
	},
];

export const DEVELOPER_INFO = {
	name: "Finesoft Developer",
	bio: "全栈工程师，专注于前端架构和开发者体验。热衷于构建高性能框架和工具，让 Web 开发更简单、更高效。在 SSR、路由系统、状态管理等领域有深入研究。",
	skills: [
		"TypeScript",
		"React",
		"Node.js",
		"Hono",
		"Vite",
		"SSR",
		"DI/IoC",
		"System Design",
	],
};
