import { exhibitions } from "@/data/exhibitions";

export function ExhibitionsSection() {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-zinc-100 sm:text-4xl">
          Exhibition timeline
        </h2>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">
          Selected solo and group shows from the past seasons.
        </p>

        <ol className="relative mt-12 space-y-0 border-l border-violet-glow/30 pl-8">
          {exhibitions.map((ex) => (
            <li key={ex.id} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-violet-glow bg-surface shadow-glow-violet"
                aria-hidden
              />
              <time className="text-sm tabular-nums text-crimson-bright">{ex.year}</time>
              <h3 className="mt-1 font-display text-xl text-zinc-100">{ex.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">
                {ex.venue} — {ex.location}
              </p>
              <span className="mt-2 inline-block text-xs capitalize text-wine-accent">
                {ex.type} exhibition
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
