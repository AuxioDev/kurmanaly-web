"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/types";
import { availabilityLabels, availabilityStyles } from "@/lib/availability";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onSelect: (artwork: Artwork) => void;
}

export function ArtworkCard({ artwork, index, onSelect }: ArtworkCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group"
    >
      <button
        type="button"
        onClick={() => onSelect(artwork)}
        className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-bright"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-surface-overlay shadow-glow transition duration-500 group-hover:border-violet-glow/30 group-hover:shadow-glow-violet">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          <span
            className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${availabilityStyles(artwork.availability)}`}
          >
            {availabilityLabels[artwork.availability]}
          </span>
        </div>
        <div className="mt-3 px-1">
          <h3 className="font-display text-lg text-zinc-100">{artwork.title}</h3>
          <p className="text-sm text-zinc-500">
            {artwork.year} · {artwork.medium}
          </p>
        </div>
      </button>
    </motion.article>
  );
}
