import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — на главную`}
      className={`flex min-h-11 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${className}`}
    >
      <Image
        src="/logo.webp"
        alt=""
        width={291}
        height={139}
        priority
        className="h-8 w-auto invert mix-blend-screen sm:h-9"
      />
      <span className="hidden font-display text-xl tracking-tight sm:inline">
        {siteConfig.name}
        <span className="text-fg-muted">.com</span>
      </span>
    </Link>
  );
}
