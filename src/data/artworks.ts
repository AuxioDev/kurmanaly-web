import type { Artwork } from "@/lib/types";

export const artworks: Artwork[] = [
  {
    id: "1",
    slug: "crimson-horizon",
    title: "Crimson Horizon",
    year: 2025,
    category: "oil",
    medium: "Oil on linen",
    dimensions: '48" × 36"',
    availability: "available",
    description:
      "Layered glazes capture the last light over the steppe — deep crimson meeting violet dusk.",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&q=85",
    featured: true,
  },
  {
    id: "2",
    slug: "violet-echo",
    title: "Violet Echo",
    year: 2024,
    category: "digital",
    medium: "Digital pigment print on archival paper",
    dimensions: '24" × 36"',
    availability: "available",
    description:
      "Generative fields modulated by hand — a dialogue between algorithm and intuition.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=85",
  },
  {
    id: "3",
    slug: "wine-garden-study",
    title: "Wine Garden Study",
    year: 2023,
    category: "oil",
    medium: "Oil and cold wax on panel",
    dimensions: '20" × 16"',
    availability: "reserved",
    description: "Intimate botanical study with wine-toned shadows and magenta highlights.",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978693-85fa59402404?w=1600&q=85",
  },
  {
    id: "4",
    slug: "glyphs-of-memory",
    title: "Glyphs of Memory",
    year: 2025,
    category: "graphics",
    medium: "Screen print, edition of 25",
    dimensions: '18" × 24"',
    availability: "available",
    description:
      "Typography and symbol fragments arranged as a visual poem on identity and place.",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=85",
  },
  {
    id: "5",
    slug: "nocturne-in-magenta",
    title: "Nocturne in Magenta",
    year: 2024,
    category: "mixed",
    medium: "Acrylic, ink, and gold leaf on canvas",
    dimensions: '40" × 30"',
    availability: "sold",
    description:
      "Night city reflections distilled into rhythmic bands of dark magenta and violet.",
    imageUrl:
      "https://images.unsplash.com/photo-1549490343-8643f32bdbf6?w=1600&q=85",
  },
  {
    id: "6",
    slug: "digital-silk-road",
    title: "Digital Silk Road",
    year: 2025,
    category: "digital",
    medium: "Animated loop, 4K master file",
    dimensions: "3840 × 2160 px",
    availability: "commission",
    description:
      "Slow-moving caravan of light across an imagined trade route — available as NFT or projection.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=85",
  },
  {
    id: "7",
    slug: "terracotta-dreams",
    title: "Terracotta Dreams",
    year: 2022,
    category: "oil",
    medium: "Oil on canvas",
    dimensions: '36" × 48"',
    availability: "available",
    description: "Earth pigments and crimson underpainting evoke ancestral landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f8a05e0b79?w=1600&q=85",
  },
  {
    id: "8",
    slug: "poster-series-vi",
    title: "Poster Series VI",
    year: 2024,
    category: "graphics",
    medium: "Risograph print",
    dimensions: '11" × 17"',
    availability: "available",
    description: "Bold geometric poster exploring cultural motifs in contemporary graphic language.",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=85",
  },
  {
    id: "9",
    slug: "woven-light",
    title: "Woven Light",
    year: 2023,
    category: "mixed",
    medium: "Textile, resin, and pigment",
    dimensions: '32" × 24" × 3"',
    availability: "available",
    description:
      "Hand-woven elements embedded in translucent resin — light passes through like stained glass.",
    imageUrl:
      "https://images.unsplash.com/photo-1515406535729-7f4f62976741?w=1600&q=85",
  },
  {
    id: "10",
    slug: "aurora-static",
    title: "Aurora Static",
    year: 2025,
    category: "digital",
    medium: "Generative still, Giclée print optional",
    dimensions: '30" × 30"',
    availability: "available",
    description: "Frozen aurora bands rendered in violet and wine gradients.",
    imageUrl:
      "https://images.unsplash.com/photo-1557672172-298e087bd0a9?w=1600&q=85",
  },
];

export const categoryLabels: Record<
  import("@/lib/types").ArtworkCategory,
  string
> = {
  all: "All works",
  oil: "Oil paintings",
  digital: "Digital",
  graphics: "Graphics",
  mixed: "Mixed media",
};

export function getFeaturedArtwork(): Artwork {
  return artworks.find((a) => a.featured) ?? artworks[0];
}
