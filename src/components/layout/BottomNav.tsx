"use client";

import { motion } from "framer-motion";
import { useScrollSpy } from "@/components/providers/SmoothScrollProvider";

const items = [
  { href: "#works", id: "works", label: "Works", icon: GridIcon },
  { href: "#exhibitions", id: "exhibitions", label: "Tour", icon: CompassIcon },
  { href: "#statement", id: "statement", label: "About", icon: UserIcon },
  { href: "#inquire", id: "inquire", label: "Inquire", icon: MailIcon },
] as const;

export function BottomNav() {
  const { activeSection, scrollTo } = useScrollSpy();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-surface/90 backdrop-blur-2xl md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ href, id, label, icon: Icon }) => {
          const active = activeSection === id;
          return (
            <li key={href} className="flex-1">
              <button
                type="button"
                onClick={() => scrollTo(href)}
                className="relative flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] text-zinc-500 transition hover:text-violet-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-bright"
              >
                {active && (
                  <motion.span
                    layoutId="mobile-nav-glow"
                    className="absolute inset-1 rounded-xl bg-violet-glow/15"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <Icon active={active} />
                <span className={active ? "text-zinc-200" : ""}>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={active ? "relative z-10 text-crimson-bright" : "relative z-10 text-current"}
      aria-hidden
    >
      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CompassIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={active ? "relative z-10 text-crimson-bright" : "relative z-10 text-current"}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 8l-2.5 7.5L8 16l2.5-7.5L16 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={active ? "relative z-10 text-crimson-bright" : "relative z-10 text-current"}
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={active ? "relative z-10 text-crimson-bright" : "relative z-10 text-current"}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
