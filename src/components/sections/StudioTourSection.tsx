"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { studioRooms } from "@/data/studioRooms";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { luxuryEase } from "@/lib/motion";

const colorOverlays: Record<
  (typeof studioRooms)[number]["colorMode"],
  string
> = {
  crimson: "from-crimson-deep/60 via-crimson-glow/20 to-transparent",
  violet: "from-violet-deep/60 via-violet-glow/25 to-transparent",
  magenta: "from-magenta-dark/60 via-magenta-glow/25 to-transparent",
};

export function StudioTourSection() {
  const [roomIndex, setRoomIndex] = useState(0);
  const room = studioRooms[roomIndex];

  return (
    <SectionReveal
      id="exhibitions"
      className="scroll-mt-28 border-t border-white/5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealItem>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-zinc-100 sm:text-5xl">
              Virtual studio tour
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Move between rooms and shift the ambient color mode to preview works
              under different light.
            </p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="mt-8 flex flex-wrap gap-2">
            {studioRooms.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoomIndex(i)}
                className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-bright ${
                  i === roomIndex
                    ? "border-violet-glow/50 bg-white/5 text-zinc-100"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </RevealItem>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <RevealItem>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: luxuryEase }}
                  className="absolute inset-0"
                >
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colorOverlays[room.colorMode]}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </RevealItem>

          <AnimatePresence mode="wait">
            <motion.div
              key={room.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: luxuryEase }}
            >
              <p className="text-sm text-violet-soft">
                Room {roomIndex + 1} of {studioRooms.length}
              </p>
              <h3 className="mt-2 font-display text-3xl text-zinc-100">{room.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{room.description}</p>
              <p className="mt-6 text-xs text-zinc-600">
                Color mode:{" "}
                <span className="capitalize text-wine-accent">{room.colorMode}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionReveal>
  );
}
