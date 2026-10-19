export const locales = ["ru", "en", "ky", "az"] as const;
export type Locale = (typeof locales)[number];

/** Русский живёт на корне (/projects), остальные языки под префиксом (/en/projects). */
export const defaultLocale: Locale = "ru";

export const siteUrl = "https://kurmanaly.com";

/**
 * Названия языков для переключателя. Код ky (ISO 639-1) нужен для hreflang и URL, а на кнопке
 * показываем привычное «KG».
 */
export const localeMeta: Record<Locale, { native: string; short: string }> = {
  ru: { native: "Русский", short: "RU" },
  en: { native: "English", short: "EN" },
  ky: { native: "Кыргызча", short: "KG" },
  az: { native: "Azərbaycanca", short: "AZ" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Путь страницы для языка: localePath("en", "/projects") → "/en/projects". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/** Убирает языковой префикс: "/en/projects" → "/projects". */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(new RegExp(`^/(${locales.join("|")})(?=/|$)`), "");
  return stripped === "" ? "/" : stripped;
}

export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${siteUrl}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`;
}

/** Подстановка значений в шаблон: fmt("Все {n} листов", { n: 17 }). */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
