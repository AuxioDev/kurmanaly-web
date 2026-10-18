export type ProjectType = "apartment" | "house" | "commercial";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Drawing extends ImageAsset {
  sheet: string;
  title: string;
}

export interface Render extends ImageAsset {
  room: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  city: string;
  year: number;
  area: number;
  type: ProjectType;
  style: string;
  summary: string;
  cover: ImageAsset;
  moodboard: ImageAsset[];
  drawings: Drawing[];
  renders: Render[];
  credits: Credit[];
  beforeAfter?: {
    before: Drawing;
    after: Drawing;
  };
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  includes: string[];
  duration: string;
  priceNote: string;
  highlighted?: boolean;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}
