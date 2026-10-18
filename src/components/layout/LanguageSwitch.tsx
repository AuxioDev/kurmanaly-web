"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

/** Переключатель RU / EN: ведёт на ту же страницу в другом языке. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const other: Locale = locale === "ru" ? "en" : "ru";

  return (
    <Link
      href={localePath(other, stripLocale(pathname))}
      prefetch={false}
      hrefLang={other}
      lang={other}
      aria-label={dict.nav.language.label}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center border border-line px-3 text-xs font-medium tracking-[0.14em] text-fg-soft transition-colors duration-300 hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange ${className}`}
    >
      {dict.nav.language.short}
    </Link>
  );
}
