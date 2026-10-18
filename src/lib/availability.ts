import type { AvailabilityStatus } from "@/lib/types";

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
  commission: "Commission only",
};

export function availabilityStyles(status: AvailabilityStatus): string {
  switch (status) {
    case "available":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    case "reserved":
      return "bg-amber-500/15 text-amber-200 border-amber-500/30";
    case "sold":
      return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
    case "commission":
      return "bg-violet-glow/20 text-violet-soft border-violet-glow/40";
  }
}
