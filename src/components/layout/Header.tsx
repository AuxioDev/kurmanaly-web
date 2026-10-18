"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const { isCompact } = useSmoothScroll();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] backdrop-blur-xl transition-[background-color] duration-500 ${
        isCompact ? "bg-canvas/80" : "bg-canvas/40"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-[height] duration-500 ease-out ${
          isCompact ? "h-14" : "h-16 sm:h-20"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Основная навигация">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-3 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 bottom-2 h-px bg-gradient-to-r from-red to-orange"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
          Обсудить проект
        </Link>
      </div>

      <div
        aria-hidden
        className={`rule-gradient absolute inset-x-0 bottom-0 transition-opacity duration-500 ${
          isCompact ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.header>
  );
}
