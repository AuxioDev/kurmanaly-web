import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Русский язык живёт на корне (/projects), английский под префиксом (/en/projects).
 *  - /ru/...      → 308 на канонический адрес без префикса
 *  - /en/...      → как есть
 *  - всё остальное → внутренний rewrite на /ru/... (адрес в браузере не меняется)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if ((locales as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // не трогаем служебные пути Next.js и любые файлы с расширением (картинки, sitemap.xml, robots.txt)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
