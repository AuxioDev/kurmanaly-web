"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Artwork } from "@/lib/types";
import { availabilityLabels, availabilityStyles } from "@/lib/availability";

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function ArtworkLightbox({ artwork, onClose }: ArtworkLightboxProps) {
  useEffect(() => {
    if (!artwork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
        >
          <button
            type="button"
            aria-label="Close artwork details"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-surface-raised shadow-glow-violet sm:max-h-[90vh] sm:rounded-3xl lg:flex-row"
          >
            <div className="relative aspect-square w-full shrink-0 bg-black lg:aspect-auto lg:w-[58%] lg:min-h-[480px]">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="lightbox-title"
                    className="font-display text-2xl text-zinc-100 sm:text-3xl"
                  >
                    {artwork.title}
                  </h2>
                  <p className="mt-1 text-zinc-500">{artwork.year}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/10 p-2 text-zinc-400 hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-bright"
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <DetailRow label="Medium" value={artwork.medium} />
                <DetailRow label="Dimensions" value={artwork.dimensions} />
                <DetailRow label="Category" value={artwork.category} />
                <div className="flex items-center gap-2 pt-2">
                  <dt className="text-zinc-500">Status</dt>
                  <dd>
                    <span
                      className={`inline-block rounded-full border px-3 py-0.5 text-xs ${availabilityStyles(artwork.availability)}`}
                    >
                      {availabilityLabels[artwork.availability]}
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-zinc-400">
                {artwork.description}
              </p>
              <a
                href="#inquire"
                onClick={onClose}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-crimson-glow to-violet-glow px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-bright"
              >
                Request this work
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 border-b border-white/5 pb-3">
      <dt className="w-28 shrink-0 text-zinc-500">{label}</dt>
      <dd className="capitalize text-zinc-200">{value}</dd>
    </div>
  );
}
