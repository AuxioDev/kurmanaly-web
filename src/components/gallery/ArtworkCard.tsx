"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { Artwork } from "@/lib/types";
import { availabilityLabels, availabilityStyles } from "@/lib/availability";
import { galleryItemVariants } from "@/lib/motion";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  onSelect: (artwork: Artwork) => void;
  isSelected?: boolean;
}

export function ArtworkCard({
  artwork,
  onSelect,
  isSelected = false,
}: ArtworkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [10, -10]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-10, 10]), {
    stiffness: 260,
    damping: 22,
  });

  const glareX = useTransform(pointerX, [0, 1], [0, 100]);
  const glareY = useTransform(pointerY, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18), transparent 55%)`;

  function handlePointerMove(e: React.PointerEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.article
      layout
      layoutId={`artwork-card-${artwork.id}`}
      variants={galleryItemVariants}
      className="group [perspective:1200px]"
    >
      <button
        type="button"
        onClick={() => onSelect(artwork)}
        className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-bright"
      >
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ z: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-surface-overlay shadow-glow transition-[box-shadow,border-color] duration-500 group-hover:border-violet-glow/35 group-hover:shadow-glow-violet"
        >
          {!isSelected && (
            <motion.div
              layoutId={`artwork-image-${artwork.id}`}
              className="absolute inset-0"
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 32,
              }}
            >
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          )}

          {isSelected && (
            <div className="absolute inset-0 bg-surface-overlay/80 backdrop-blur-sm" />
          )}

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
            style={{ background: glareBackground }}
          />
          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          <span
            className={`absolute right-3 top-3 z-10 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${availabilityStyles(artwork.availability)}`}
          >
            {availabilityLabels[artwork.availability]}
          </span>
        </motion.div>
        <motion.div
          className="mt-3 px-1"
          style={{ transform: "translateZ(20px)" }}
        >
          <h3 className="font-display text-xl text-zinc-100">{artwork.title}</h3>
          <p className="mt-0.5 text-sm text-zinc-500">
            {artwork.year} · {artwork.medium}
          </p>
        </motion.div>
      </button>
    </motion.article>
  );
}
