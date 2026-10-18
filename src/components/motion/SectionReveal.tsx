"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { sectionChildVariants, sectionRevealVariants } from "@/lib/motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function SectionReveal({
  children,
  className = "",
  id,
  as = "section",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    margin: "-8% 0px -8% 0px",
    amount: 0.15,
  });

  const animateState = reduceMotion || isInView ? "visible" : "hidden";
  const shared = {
    ref,
    id,
    className,
    initial: reduceMotion ? false : ("hidden" as const),
    animate: animateState,
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={sectionChildVariants}>
      {children}
    </motion.div>
  );
}
