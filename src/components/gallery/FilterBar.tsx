"use client";

import { motion } from "framer-motion";
import type { ArtworkCategory } from "@/lib/types";
import { categoryLabels } from "@/data/artworks";

const categories: ArtworkCategory[] = [
  "all",
  "oil",
  "digital",
  "graphics",
  "mixed",
];

interface FilterBarProps {
  active: ArtworkCategory;
  onChange: (category: ArtworkCategory) => void;
  className?: string;
}

export function FilterBar({ active, onChange, className = "" }: FilterBarProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="tablist"
      aria-label="Filter artworks by category"
    >
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-bright ${
              isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                className="absolute inset-0 rounded-full border border-violet-glow/40 bg-gradient-to-r from-crimson-glow/30 via-violet-glow/25 to-magenta-glow/20 shadow-glow-violet"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{categoryLabels[cat]}</span>
          </button>
        );
      })}
    </div>
  );
}
