"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { localeMeta, locales, localePath, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

/** Выпадающее меню выбора языка: ведёт на ту же страницу на другом языке. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, dict } = useI18n();
  const path = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label={`${dict.nav.language.label}: ${localeMeta[locale].native}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 border border-line px-3 text-xs font-medium tracking-[0.14em] text-fg-soft transition-colors duration-300 hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
      >
        {localeMeta[locale].short}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 min-w-48 border border-line bg-canvas/95 p-1 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            {locales.map((l) => {
              const active = l === locale;
              return (
                <li key={l}>
                  <Link
                    href={localePath(l, path)}
                    hrefLang={l}
                    lang={l}
                    prefetch={false}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-11 items-center justify-between gap-6 px-3 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange ${
                      active ? "text-orange" : "text-fg-soft hover:bg-surface hover:text-fg"
                    }`}
                  >
                    <span>{localeMeta[l].native}</span>
                    <span className="text-xs tracking-[0.14em] text-fg-muted">{localeMeta[l].short}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
