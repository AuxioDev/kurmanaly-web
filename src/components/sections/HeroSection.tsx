"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Artwork } from "@/lib/types";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { luxuryEase } from "@/lib/motion";

interface HeroSectionProps {
  featured: Artwork;
}

export function HeroSection({ featured }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="lg:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, ease: luxuryEase }}
        >
          <p className="font-body text-sm font-medium text-violet-soft">
            Featured work
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-zinc-100 sm:text-6xl lg:text-7xl">
            {featured.title}
          </h1>
          <p className="mt-5 font-display text-2xl text-zinc-400">{featured.year}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500">
            {featured.description}
          </p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.65, ease: luxuryEase }}
            className="mt-10"
          >
            <MagneticButton
              href="#works"
              className="rounded-full bg-gradient-to-r from-crimson-bright via-magenta-glow to-violet-glow px-8 py-4 text-sm font-semibold text-white shadow-glow"
            >
              Explore the collection
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-7"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: luxuryEase }}
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-white/10 shadow-glow-violet">
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-crimson-deep/40 via-transparent to-violet-glow/20" />
          </div>
          <motion.div
            className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-wine-accent/30 bg-surface-overlay/90 px-4 py-3 backdrop-blur md:block"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <p className="text-xs text-zinc-500">{featured.medium}</p>
            <p className="text-sm text-zinc-200">{featured.dimensions}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
