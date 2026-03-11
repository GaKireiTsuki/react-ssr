import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { app } from "../server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const prodApp = new Hono();

// Serve static assets from dist/client first
prodApp.use(
	"/*",
	serveStatic({
		root: resolve(root, "dist/client"),
		// Prevent directory paths from auto-serving index.html (let SSR handle them)
		rewriteRequestPath: (path) =>
			path.endsWith("/") ? "/__nosuchfile__" : path,
	}),
);

// Fall through to SSR for all other routes
prodApp.route("/", app);

export default handle(prodApp);
