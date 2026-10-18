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
      className={`fixed inset-x-0 top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors ${
        isCompact ? "border-line" : "border-transparent"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-[height] duration-300 ${
          isCompact ? "h-14" : "h-16 sm:h-20"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-ink"
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
    </motion.header>
  );
}
