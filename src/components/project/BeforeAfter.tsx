"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Drawing } from "@/lib/types";

interface BeforeAfterProps {
  before: Drawing;
  after: Drawing;
}

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <div>
      <div
        className="relative select-none overflow-hidden border border-line bg-paper-raised"
        style={{ aspectRatio: `${before.width} / ${before.height}` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-contain"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-contain"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-ink"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-ink bg-paper text-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 7l-5 5 5 5M15 7l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 bg-paper/90 px-2.5 py-1 text-xs">
          До: {before.title}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-paper/90 px-2.5 py-1 text-xs">
          После: {after.title}
        </span>

        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Сравнить обмерный план и план перепланировки"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        Потяните ползунок, чтобы сравнить исходную планировку и результат.
      </p>
    </div>
  );
}
