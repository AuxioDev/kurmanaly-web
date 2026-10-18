import type { Locale } from "@/i18n/config";
import { fmt } from "@/i18n/config";
import type { Drawing, ImageAsset, Project, ProjectType, Render } from "@/lib/types";

type RoomKey = "master" | "bathroom" | "wardrobe";

/** Тексты проекта на одном языке. Всё остальное (картинки, цифры) общее для языков. */
interface ProjectCopy {
  title: string;
  city: string;
  style: string;
  summary: string;
  coverAlt: string;
  moodboardAlt: string;
  drawingAlt: string;
  renderAlt: string;
  drawings: Record<string, string>;
  rooms: Record<RoomKey, string>;
  credits: { design: { role: string; name: string }; visualization: { role: string; name: string } };
}

interface ProjectSource {
  slug: string;
  year: number;
  area: number;
  type: ProjectType;
  base: string;
  cover: Omit<ImageAsset, "alt">;
  /** Картинки мудборда. Пока массива нет, секция «Мудборд» на странице проекта скрыта. */
  moodboard?: Omit<ImageAsset, "alt">[];
  sheets: string[];
  renders: { n: string; room: RoomKey; portrait?: boolean; height?: number }[];
  beforeAfter?: { before: string; after: string };
  copy: Record<Locale, ProjectCopy>;
}

const sources: ProjectSource[] = [
  {
    slug: "novyi-siti-bey",
    year: 2025,
    area: 86,
    type: "apartment",
    base: "/projects/novyi-siti-bey",
    cover: { src: "/projects/novyi-siti-bey/cover.webp", width: 1280, height: 800 },
    sheets: ["03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
    renders: [
      { n: "01", room: "master" },
      { n: "02", room: "master" },
      { n: "03", room: "master", height: 727 },
      { n: "04", room: "master" },
      { n: "05", room: "master" },
      { n: "06", room: "master" },
      { n: "07", room: "bathroom", portrait: true },
      { n: "08", room: "bathroom", portrait: true },
      { n: "09", room: "bathroom", portrait: true },
      { n: "10", room: "bathroom", portrait: true },
      { n: "11", room: "wardrobe", portrait: true },
      { n: "12", room: "wardrobe", portrait: true },
    ],
    beforeAfter: { before: "03", after: "06" },
    copy: {
      ru: {
        title: "Новый Сити Бей",
        city: "Москва",
        style: "Тёмный контемпорари",
        summary:
          "Двухкомнатная квартира с перепланировкой: мастер-спальня получила собственный санузел и гардеробную за стеклянной перегородкой. Графитовые панели, оливковые фасады и красный ковёр создают спокойный глубокий контраст.",
        coverAlt: "Мастер-спальня, проект «Новый Сити Бей»",
        moodboardAlt: "Мудборд проекта «Новый Сити Бей»",
        drawingAlt: "{title}, лист {sheet}",
        renderAlt: "Визуализация: {room}",
        drawings: {
          "03": "Обмерный план",
          "04": "Демонтажный план",
          "05": "Монтажный план",
          "06": "План перепланировки",
          "07": "План сантехники",
          "08": "План напольного покрытия",
          "09": "План тёплого пола",
          "10": "План мебели",
          "11": "План розеточных групп",
          "12": "План осветительных приборов",
          "13": "План освещения",
          "14": "План потолка",
          "15": "План отделки стен",
          "16": "Развертки санузла",
          "17": "Спецификация мебели",
          "18": "Спецификация мебели №2",
          "19": "Спецификация мебели №3",
        },
        rooms: { master: "Мастер-спальня", bathroom: "Санузел", wardrobe: "Гардеробная" },
        credits: {
          design: { role: "Дизайн и чертежи", name: "Малика Курманалиева" },
          visualization: { role: "Визуализация", name: "Амина Маматибраимова" },
        },
      },
      en: {
        title: "New City Bay",
        city: "Moscow",
        style: "Dark contemporary",
        summary:
          "A two-room apartment with a re-plan: the master bedroom gained its own bathroom and a wardrobe behind a glass partition. Graphite panels, olive fronts and a red rug create a calm, deep contrast.",
        coverAlt: "Master bedroom, New City Bay project",
        moodboardAlt: "Moodboard of the New City Bay project",
        drawingAlt: "{title}, sheet {sheet}",
        renderAlt: "Visualization: {room}",
        drawings: {
          "03": "Measured survey plan",
          "04": "Demolition plan",
          "05": "Construction plan",
          "06": "Proposed layout plan",
          "07": "Plumbing plan",
          "08": "Flooring plan",
          "09": "Underfloor heating plan",
          "10": "Furniture plan",
          "11": "Power outlets plan",
          "12": "Lighting fixtures plan",
          "13": "Lighting control plan",
          "14": "Ceiling plan",
          "15": "Wall finishes plan",
          "16": "Bathroom elevations",
          "17": "Furniture specification",
          "18": "Furniture specification No. 2",
          "19": "Furniture specification No. 3",
        },
        rooms: { master: "Master bedroom", bathroom: "Bathroom", wardrobe: "Wardrobe" },
        credits: {
          design: { role: "Design and drawings", name: "Malika Kurmanalieva" },
          visualization: { role: "Visualization", name: "Amina Mamatibraimova" },
        },
      },
    },
  },
];

function localize(source: ProjectSource, locale: Locale): Project {
  const copy = source.copy[locale];

  const drawing = (sheet: string): Drawing => {
    const title = copy.drawings[sheet];
    return {
      sheet,
      title,
      src: `${source.base}/drawings/${sheet}.webp`,
      width: 2481,
      height: 1754,
      alt: fmt(copy.drawingAlt, { title, sheet }),
    };
  };

  const render = (r: ProjectSource["renders"][number]): Render => {
    const room = copy.rooms[r.room];
    return {
      room,
      src: `${source.base}/renders/${r.n}.webp`,
      width: r.portrait ? 800 : 1280,
      height: r.portrait ? 1280 : (r.height ?? 800),
      alt: fmt(copy.renderAlt, { room }),
    };
  };

  return {
    slug: source.slug,
    title: copy.title,
    city: copy.city,
    year: source.year,
    area: source.area,
    type: source.type,
    style: copy.style,
    summary: copy.summary,
    cover: { ...source.cover, alt: copy.coverAlt },
    moodboard: (source.moodboard ?? []).map((m) => ({ ...m, alt: copy.moodboardAlt })),
    drawings: source.sheets.map(drawing),
    renders: source.renders.map(render),
    credits: [
      { role: copy.credits.design.role, name: copy.credits.design.name },
      { role: copy.credits.visualization.role, name: copy.credits.visualization.name },
    ],
    beforeAfter: source.beforeAfter
      ? { before: drawing(source.beforeAfter.before), after: drawing(source.beforeAfter.after) }
      : undefined,
  };
}

export function getProjects(locale: Locale): Project[] {
  return sources.map((s) => localize(s, locale));
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  const source = sources.find((s) => s.slug === slug);
  return source ? localize(source, locale) : undefined;
}

export function getFeaturedProject(locale: Locale): Project {
  return localize(sources[0], locale);
}

export const projectSlugs: string[] = sources.map((s) => s.slug);
