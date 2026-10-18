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

const SECTION_IDS = ["works", "exhibitions", "statement", "inquire"] as const;

interface ScrollContextValue {
  scrollY: number;
  isCompact: boolean;
  activeSection: (typeof SECTION_IDS)[number] | null;
  scrollTo: (target: string) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] =
    useState<(typeof SECTION_IDS)[number] | null>(null);

  const isCompact = scrollY > 56;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
    });

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

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId: (typeof SECTION_IDS)[number] | null = null;
        let bestRatio = 0;

        for (const id of SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0.12) {
          setActiveSection(bestId);
        } else if (scrollY < 120) {
          setActiveSection(null);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.12, 0.25, 0.4, 0.6, 0.8, 1],
      },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [scrollY]);

  const scrollTo = useCallback((target: string) => {
    const id = target.startsWith("#") ? target : `#${target}`;
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(id, { offset: -88, duration: 1.35 });
      return;
    }

    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({ scrollY, isCompact, activeSection, scrollTo }),
    [scrollY, isCompact, activeSection, scrollTo],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollSpy() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollSpy must be used within SmoothScrollProvider");
  }
  return ctx;
}
