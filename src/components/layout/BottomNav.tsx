"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { localePath, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

const icons: Record<string, React.ReactNode> = {
  "/projects": (
    <>
      <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  "/services": (
    <>
      <path d="M4 20V8l8-4 8 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  "/about": (
    <>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "/contact": (
    <>
      <rect x="3" y="5" width="18" height="14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
};

export function BottomNav() {
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const { locale, dict } = useI18n();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas/95 backdrop-blur-md md:hidden"
      aria-label={dict.nav.mobileLabel}
    >
      <ul className="flex items-stretch justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {dict.nav.links.map(({ href, label }) => {
          const active = path === href || path.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={localePath(locale, href)}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-14 flex-col items-center justify-center gap-1 px-2 py-1.5 text-xs transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange ${
                  active ? "text-orange" : "text-fg-muted"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    aria-hidden
                    className="absolute inset-x-3 -top-2 h-0.5 bg-gradient-to-r from-red to-orange"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {icons[href]}
                </svg>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
