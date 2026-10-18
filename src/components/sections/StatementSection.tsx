"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { luxuryEase } from "@/lib/motion";

const biography = `Kurmanaly is a contemporary artist working across oil painting, digital media, and graphic editions. Born along the Silk Road corridor, their practice weaves Central Asian landscape memory with urban nocturnes — always through a lens of deep crimson, violet, and wine-toned light.

The studio splits time between large-format canvas work and a digital lab where generative tools extend traditional composition. Collectors and institutions in Almaty, Berlin, and Istanbul have acquired works from ongoing series on horizon, echo, and glyph.`;

const statement = `I paint the moment color outruns language — when dusk on the steppe becomes indistinguishable from interior emotion. Each surface holds layers of transparency: geological time in pigment, personal time in gesture.

My digital pieces are not departures from painting but continuations of the same question: how does light carry homeland across distance? I invite viewers to move slowly, whether in a physical gallery or this virtual studio.`;

export function StatementSection() {
  const [tab, setTab] = useState<"bio" | "statement">("bio");

  return (
    <SectionReveal
      id="statement"
      className="scroll-mt-28 border-t border-white/5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <RevealItem className="lg:col-span-4">
            <h2 className="font-display text-3xl text-zinc-100 sm:text-5xl">Statement</h2>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist">
              {(
                [
                  ["bio", "Biography"],
                  ["statement", "Artist statement"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`rounded-full px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-bright ${
                    tab === key
                      ? "bg-magenta-dark/40 text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </RevealItem>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className="lg:col-span-8"
          >
            <div className="rounded-3xl border border-white/5 bg-surface-overlay/50 p-8 sm:p-10">
              {(tab === "bio" ? biography : statement)
                .split("\n\n")
                .map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="mb-6 last:mb-0 text-base leading-relaxed text-zinc-400"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
