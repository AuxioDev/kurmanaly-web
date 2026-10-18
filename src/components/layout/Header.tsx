"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useScrollSpy } from "@/components/providers/SmoothScrollProvider";
import { luxuryEase } from "@/lib/motion";

const navLinks = [
  { href: "#works", id: "works", label: "Works" },
  { href: "#exhibitions", id: "exhibitions", label: "Exhibitions" },
  { href: "#statement", id: "statement", label: "Statement" },
  { href: "#inquire", id: "inquire", label: "Inquire" },
] as const;

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isCompact, activeSection, scrollTo } = useScrollSpy();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: luxuryEase }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="pointer-events-auto w-full max-w-6xl overflow-hidden border border-white/10 bg-white/[0.04] shadow-glow-violet backdrop-blur-2xl supports-[backdrop-filter]:bg-white/[0.06]"
        animate={{
          borderRadius: isCompact ? 20 : 14,
          boxShadow: isCompact
            ? "0 8px 40px -12px rgba(91, 44, 143, 0.45)"
            : "0 4px 24px -12px rgba(91, 44, 143, 0.25)",
        }}
      >
        <motion.div
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6"
          animate={{ height: isCompact ? 56 : 72 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        >
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            className="group text-left font-display text-lg tracking-tight text-zinc-100 sm:text-xl"
          >
            <span className="text-crimson-bright transition-colors group-hover:text-violet-soft">
              kurmanaly
            </span>
            <span className="text-zinc-500">.com</span>
          </button>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-bright ${
                    isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-violet-glow/35 bg-gradient-to-r from-crimson-glow/25 to-violet-glow/20"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-crimson-bright"
                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-raised/60 text-zinc-300 transition hover:border-violet-glow/40 hover:text-violet-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-bright"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
      />
    </svg>
  );
}
