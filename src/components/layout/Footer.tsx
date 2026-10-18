import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface-raised pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl text-zinc-100">
              kurmanaly<span className="text-zinc-500">.com</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
              Contemporary art portfolio — oil, digital, graphics, and mixed media
              from the studio of Kurmanaly.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
            <Link href="#works" className="hover:text-zinc-300">
              Works
            </Link>
            <Link href="#exhibitions" className="hover:text-zinc-300">
              Exhibitions
            </Link>
            <Link href="#statement" className="hover:text-zinc-300">
              Statement
            </Link>
            <Link href="#inquire" className="hover:text-zinc-300">
              Inquire
            </Link>
          </div>
        </div>
        <p className="mt-10 text-xs text-zinc-600">
          © {year} Kurmanaly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
