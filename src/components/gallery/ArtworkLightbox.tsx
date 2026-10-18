"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Artwork } from "@/lib/types";
import { availabilityLabels, availabilityStyles } from "@/lib/availability";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useScrollSpy } from "@/components/providers/SmoothScrollProvider";
import {
  modalBackdropVariants,
  modalPanelVariants,
  springModal,
} from "@/lib/motion";

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function ArtworkLightbox({ artwork, onClose }: ArtworkLightboxProps) {
  const { scrollTo } = useScrollSpy();

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
    <AnimatePresence mode="wait">
      {artwork && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[100]"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            aria-label="Close artwork details"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-[#050208]/92 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            layoutId={`artwork-image-${artwork.id}`}
            className="absolute inset-0 z-[1]"
            transition={springModal}
          >
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              sizes="100vw"
              className="object-contain p-4 pb-44 sm:p-8 sm:pb-48"
              priority
            />
          </motion.div>

          <motion.div
            variants={modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 bottom-0 z-[2] border-t border-white/10 bg-surface/90 backdrop-blur-2xl"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      id="lightbox-title"
                      className="font-display text-2xl text-zinc-100 sm:text-4xl"
                    >
                      {artwork.title}
                    </h2>
                    <p className="mt-1 font-body text-sm text-zinc-500">
                      {artwork.year}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 rounded-full border border-white/10 p-2.5 text-zinc-400 hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-bright"
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
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <DetailRow label="Medium" value={artwork.medium} />
                  <DetailRow label="Dimensions" value={artwork.dimensions} />
                  <DetailRow label="Category" value={artwork.category} />
                  <div className="flex items-center gap-2">
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
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {artwork.description}
                </p>
              </div>
              <MagneticButton
                className="shrink-0 rounded-full bg-gradient-to-r from-crimson-glow to-violet-glow px-7 py-3.5 text-sm font-medium text-white shadow-glow transition hover:opacity-95"
                onClick={() => {
                  onClose();
                  scrollTo("#inquire");
                }}
              >
                Request this work
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 text-zinc-500">{label}</dt>
      <dd className="capitalize text-zinc-200">{value}</dd>
    </div>
  );
}
