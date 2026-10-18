"use client";

import { exhibitions } from "@/data/exhibitions";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";

export function ExhibitionsSection() {
  return (
    <SectionReveal className="border-t border-white/5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealItem>
          <h2 className="font-display text-3xl text-zinc-100 sm:text-5xl">
            Exhibition timeline
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Selected solo and group shows from the past seasons.
          </p>
        </RevealItem>

        <ol className="relative mt-14 space-y-0 border-l border-violet-glow/30 pl-8">
          {exhibitions.map((ex, i) => (
            <RevealItem key={ex.id}>
              <li className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-violet-glow bg-surface shadow-glow-violet"
                  aria-hidden
                />
                <time className="text-sm tabular-nums text-crimson-bright">{ex.year}</time>
                <h3 className="mt-1 font-display text-2xl text-zinc-100">{ex.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {ex.venue} — {ex.location}
                </p>
                <span className="mt-2 inline-block text-xs capitalize text-wine-accent">
                  {ex.type} exhibition
                </span>
              </li>
            </RevealItem>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
