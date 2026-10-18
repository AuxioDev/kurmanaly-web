"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { sectionChildVariants, sectionRevealVariants } from "@/lib/motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

/*
 * Настройку «уменьшить движение» учитывает MotionConfig (см. MotionProvider): он отключает
 * смещения, а прозрачность оставляет. Здесь нельзя ветвить разметку по useReducedMotion():
 * сервер рендерит скрытое состояние, и при другом элементе на клиенте стили opacity:0
 * остаются в DOM навсегда (контент невидим).
 */
export function SectionReveal({
  children,
  className = "",
  id,
  as = "section",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // amount: "some" — секция проявляется, как только её верхний край входит в экран.
  // Доля высоты (раньше 15%) не годится для очень высоких секций: они оставались невидимыми.
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: "some",
  });

  const shared = {
    ref,
    id,
    className,
    initial: "hidden" as const,
    animate: isInView ? "visible" : "hidden",
    variants: sectionRevealVariants,
  };

  if (as === "div") {
    return <motion.div {...shared}>{children}</motion.div>;
  }

  return <motion.section {...shared}>{children}</motion.section>;
}

export function RevealItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={sectionChildVariants}>
      {children}
    </motion.div>
  );
}
