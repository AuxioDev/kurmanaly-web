"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const MAGNETIC_STRENGTH = 0.28;

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * MAGNETIC_STRENGTH);
    y.set(offsetY * MAGNETIC_STRENGTH);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-flex items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  function handleHashNav(target: string) {
    scrollTo(target);
    onClick?.();
  }

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {href && href.startsWith("#") ? (
        <button
          type="button"
          className={className}
          aria-label={ariaLabel}
          onClick={() => handleHashNav(href)}
        >
          {content}
        </button>
      ) : href ? (
        <Link href={href} className={className} aria-label={ariaLabel}>
          {content}
        </Link>
      ) : (
        <button
          type={type}
          className={className}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
        >
          {content}
        </button>
      )}
    </div>
  );
}
