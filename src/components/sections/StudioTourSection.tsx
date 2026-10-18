"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { studioRooms } from "@/data/studioRooms";

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
    <section
      id="exhibitions"
      className="scroll-mt-24 border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-zinc-100 sm:text-4xl">
            Virtual studio tour
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Move between rooms and shift the ambient color mode to preview works
            under different light.
          </p>
        </div>

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

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={room.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={room.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-violet-soft">Room {roomIndex + 1} of {studioRooms.length}</p>
              <h3 className="mt-2 font-display text-2xl text-zinc-100">{room.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{room.description}</p>
              <p className="mt-6 text-xs text-zinc-600">
                Color mode:{" "}
                <span className="capitalize text-wine-accent">{room.colorMode}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
