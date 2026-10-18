import type { StudioRoom } from "@/lib/types";

export const studioRooms: StudioRoom[] = [
  {
    id: "main",
    name: "Main atelier",
    description:
      "North-lit walls where large canvases take shape. Oil palettes, easels, and the scent of linseed.",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&q=85",
    colorMode: "crimson",
  },
  {
    id: "digital",
    name: "Digital lab",
    description:
      "Calibrated displays and print proofs. Where code meets pigment in controlled violet light.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=85",
    colorMode: "violet",
  },
  {
    id: "gallery",
    name: "Private viewing room",
    description:
      "Intimate space for collectors — works on rotation under adjustable magenta wash lighting.",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978693-85fa59402404?w=1400&q=85",
    colorMode: "magenta",
  },
];
