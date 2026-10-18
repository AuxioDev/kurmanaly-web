"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ScrollContextValue {
  isCompact: boolean;
  scrollTo: (target: string) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    const id = target.startsWith("#") ? target : `#${target}`;
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(id, { offset: -88, duration: 1.2 });
      return;
    }

    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(() => ({ isCompact, scrollTo }), [isCompact, scrollTo]);

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return ctx;
}
