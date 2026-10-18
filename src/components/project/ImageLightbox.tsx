"use client";

import { FadeImage } from "@/components/motion/FadeImage";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { modalBackdropVariants } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nProvider";
import type { ImageAsset } from "@/lib/types";

export interface LightboxItem extends ImageAsset {
  title: string;
  caption?: string;
}

interface ImageLightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const ZOOM_LEVELS = [1, 1.75, 2.5] as const;

export function ImageLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const { dict } = useI18n();
  const t = dict.lightbox;
  const [zoomIdx, setZoomIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const item = index !== null ? items[index] : null;
  const zoom = ZOOM_LEVELS[zoomIdx];

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setZoomIdx(0);
    scrollerRef.current?.scrollTo({ top: 0, left: 0 });
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=")
        setZoomIdx((z) => Math.min(z + 1, ZOOM_LEVELS.length - 1));
      else if (e.key === "-") setZoomIdx((z) => Math.max(z - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose, go]);

  // Рендерим в body: предки с filter/transform (SectionReveal) ломают position: fixed
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[100] flex flex-col bg-canvas"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
            <div className="min-w-0">
              <p className="truncate font-display text-lg sm:text-2xl">{item.title}</p>
              {item.caption && (
                <p className="truncate text-xs text-fg-muted">{item.caption}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <span className="mr-2 hidden text-xs text-fg-muted sm:inline">
                {(index ?? 0) + 1} / {items.length}
              </span>
              <IconButton
                label={t.zoomOut}
                disabled={zoomIdx === 0}
                onClick={() => setZoomIdx((z) => Math.max(z - 1, 0))}
              >
                <path d="M5 12h14" />
              </IconButton>
              <IconButton
                label={t.zoomIn}
                disabled={zoomIdx === ZOOM_LEVELS.length - 1}
                onClick={() =>
                  setZoomIdx((z) => Math.min(z + 1, ZOOM_LEVELS.length - 1))
                }
              >
                <path d="M5 12h14M12 5v14" />
              </IconButton>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t.close}
                className="ml-1 flex h-11 w-11 items-center justify-center border border-line text-fg transition-colors duration-300 hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 bg-sunken">
            <div
              ref={scrollerRef}
              data-lenis-prevent
              className="absolute inset-0 overflow-auto"
              onTouchStart={(e) => {
                const t = e.touches[0];
                touchStart.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchEnd={(e) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start || zoomIdx !== 0) return;
                const t = e.changedTouches[0];
                const dx = t.clientX - start.x;
                const dy = t.clientY - start.y;
                if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
              }}
            >
              <div
                className="flex min-h-full items-center justify-center p-3 sm:p-6"
                style={{ width: `${zoom * 100}%` }}
              >
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full justify-center"
                >
                <FadeImage
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes={`${Math.round(zoom * 100)}vw`}
                  quality={85}
                  priority
                  onClick={() =>
                    setZoomIdx((z) => (z + 1) % ZOOM_LEVELS.length)
                  }
                  className={`h-auto bg-surface shadow-sm ${
                    zoom === 1
                      ? "max-h-[calc(100dvh-9rem)] w-auto max-w-full cursor-zoom-in object-contain"
                      : "w-full cursor-zoom-out"
                  }`}
                />
                </motion.div>
              </div>
            </div>

            {items.length > 1 && (
              <>
                <NavArrow side="left" label={t.prev} onClick={() => go(-1)} />
                <NavArrow side="right" label={t.next} onClick={() => go(1)} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center border border-line text-fg transition-colors duration-300 hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange disabled:opacity-30 disabled:hover:border-line"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

function NavArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-canvas/90 text-fg backdrop-blur hover:border-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
