export type ArtworkCategory =
  | "all"
  | "oil"
  | "digital"
  | "graphics"
  | "mixed";

export type AvailabilityStatus = "available" | "reserved" | "sold" | "commission";

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  year: number;
  category: Exclude<ArtworkCategory, "all">;
  medium: string;
  dimensions: string;
  availability: AvailabilityStatus;
  description: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  year: number;
  type: "solo" | "group";
}

export interface StudioRoom {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  colorMode: "crimson" | "violet" | "magenta";
}

export interface NavLink {
  href: string;
  label: string;
}
