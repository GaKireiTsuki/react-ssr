import { createServer } from "@finesoft/front";
import { COUNTRY_CODES, DEFAULT_COUNTRY } from "./src/locale";

const { app } = await createServer({
	locales: [...COUNTRY_CODES],
	defaultLocale: DEFAULT_COUNTRY,
	ssr: {
		ssrEntryPath: "/src/ssr.tsx",
		ssrProductionModule: "./dist/server/ssr.js",
	},
});

export { app };
