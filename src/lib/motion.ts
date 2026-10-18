import type { Variants } from "framer-motion";

export const luxuryEase = [0.22, 1, 0.36, 1] as const;

export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: luxuryEase,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

export const sectionChildVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: luxuryEase },
  },
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: luxuryEase },
  },
};
