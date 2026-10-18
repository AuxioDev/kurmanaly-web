# kurmanaly-web

Production-ready art portfolio and digital gallery for **kurmanaly.com**, built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Responsive header with **kurmanaly.com** branding and navigation (Works, Exhibitions, Statement, Inquire)
- Theme toggle (dark / light) and animated category filter bar
- Hero with featured artwork, entrance animations, and collection CTA
- Filterable gallery (Oil, Digital, Graphics, Mixed Media) with lightbox details
- Virtual studio tour with room switching and color modes
- Artist statement / biography tabs and exhibition timeline
- Inquiry form for purchases and commissions
- Mobile bottom navigation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Development server       |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | ESLint                   |

## Project structure

```
src/
  app/           # App Router pages and global styles
  components/    # Header, footer, gallery, sections
  data/          # Mock artworks, exhibitions, studio rooms
  lib/           # Types and shared utilities
```

Artwork images use Unsplash placeholders configured in `next.config.mjs`. Replace with your own assets for production.
