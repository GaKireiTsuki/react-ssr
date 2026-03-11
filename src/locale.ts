/** 支持的国家代码列表（与 server.ts 的 locales 对应） */
export const COUNTRY_CODES = ["cn", "us"] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

export const DEFAULT_COUNTRY: CountryCode = COUNTRY_CODES[0];

export function getCountryPrefix(pathname?: string): string {
	if (!pathname) return "";
	const parts = pathname.split("/");
	const code = parts[1]?.toLowerCase();
	if (code && COUNTRY_CODES.includes(code as CountryCode)) {
		return `/${code}`;
	}
	return "";
}
