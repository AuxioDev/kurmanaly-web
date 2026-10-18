"use client";

import { MotionConfig } from "framer-motion";

/** Все framer-motion анимации учитывают системную настройку «уменьшить движение». */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
