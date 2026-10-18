"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";

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

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas/95 backdrop-blur-md md:hidden"
      aria-label="Мобильная навигация"
    >
      <ul className="flex items-stretch justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {navLinks.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange ${
                  active ? "text-orange" : "text-fg-muted"
                }`}
              >
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
