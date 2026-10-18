import type { Transition, Variants } from "framer-motion";

export const luxuryEase = [0.22, 1, 0.36, 1] as const;

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.85,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 1,
};

export const springModal: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.9,
};

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

export const galleryContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

export const galleryItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25, ease: luxuryEase },
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

export const modalPanelVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springModal,
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    transition: springModal,
  },
};
