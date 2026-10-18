"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { artworks } from "@/data/artworks";
import type { Artwork, ArtworkCategory } from "@/lib/types";
import { FilterBar } from "@/components/gallery/FilterBar";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { ArtworkLightbox } from "@/components/gallery/ArtworkLightbox";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { galleryContainerVariants } from "@/lib/motion";

export function GallerySection() {
  const [category, setCategory] = useState<ArtworkCategory>("all");
  const [selected, setSelected] = useState<Artwork | null>(null);

  const filtered = useMemo(() => {
    if (category === "all") return artworks;
    return artworks.filter((a) => a.category === category);
  }, [category]);

  return (
    <SectionReveal
      id="works"
      className="scroll-mt-28 border-t border-white/5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <RevealItem>
            <h2 className="font-display text-3xl text-zinc-100 sm:text-5xl">Works</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
              Filter by medium. Select any piece for a full-screen view with details
              and availability.
            </p>
          </RevealItem>
          <RevealItem>
            <FilterBar active={category} onChange={setCategory} />
          </RevealItem>
        </div>

        <LayoutGroup id="gallery-grid">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={category}
              layout
              variants={galleryContainerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onSelect={setSelected}
                  isSelected={selected?.id === artwork.id}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-zinc-500">
            No works in this category yet. Try another filter.
          </p>
        )}
      </div>

      <ArtworkLightbox artwork={selected} onClose={() => setSelected(null)} />
    </SectionReveal>
  );
}
