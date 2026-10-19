"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeMeta, locales, localePath, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

/** Список языков в подвале: обычные ссылки на ту же страницу, видны и поисковикам. */
export function LanguageLinks() {
  const { locale } = useI18n();
  const path = stripLocale(usePathname());

  return (
    <ul className="mt-2 flex flex-wrap gap-x-5 text-sm">
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            prefetch={false}
            aria-current={l === locale ? "true" : undefined}
            className={`tap transition-colors duration-300 hover:text-orange ${
              l === locale ? "text-orange" : "text-fg-soft"
            }`}
          >
            {localeMeta[l].native}
          </Link>
        </li>
      ))}
    </ul>
  );
}
