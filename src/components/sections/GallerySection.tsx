"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { artworks } from "@/data/artworks";
import type { Artwork, ArtworkCategory } from "@/lib/types";
import { FilterBar } from "@/components/gallery/FilterBar";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { ArtworkLightbox } from "@/components/gallery/ArtworkLightbox";

export function GallerySection() {
  const [category, setCategory] = useState<ArtworkCategory>("all");
  const [selected, setSelected] = useState<Artwork | null>(null);

  const filtered = useMemo(() => {
    if (category === "all") return artworks;
    return artworks.filter((a) => a.category === category);
  }, [category]);

  return (
    <section id="works" className="scroll-mt-24 border-t border-white/5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-zinc-100 sm:text-4xl">Works</h2>
            <p className="mt-2 max-w-lg text-sm text-zinc-500">
              Filter by medium. Select any piece for full details and availability.
            </p>
          </div>
          <FilterBar active={category} onChange={setCategory} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onSelect={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-zinc-500">
            No works in this category yet. Try another filter.
          </p>
        )}
      </div>

      <ArtworkLightbox artwork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
