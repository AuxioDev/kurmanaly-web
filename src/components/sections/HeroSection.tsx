"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/types";

interface HeroSectionProps {
  featured: Artwork;
}

export function HeroSection({ featured }: HeroSectionProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm text-violet-soft">Featured work</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] text-zinc-100 sm:text-5xl lg:text-6xl">
            {featured.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{featured.year}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            {featured.description}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              href="#works"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson-bright via-magenta-glow to-violet-glow px-7 py-3.5 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-bright"
            >
              Explore the collection
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-7"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-zinc-500">{featured.medium}</p>
            <p className="text-sm text-zinc-200">{featured.dimensions}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
