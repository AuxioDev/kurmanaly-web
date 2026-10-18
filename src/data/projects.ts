import type { Drawing, ImageAsset, Project, ProjectType, Render } from "@/lib/types";

const BASE = "/projects/novyi-siti-bey";

function drawing(sheet: string, title: string): Drawing {
  return {
    sheet,
    title,
    src: `${BASE}/drawings/${sheet}.webp`,
    width: 2481,
    height: 1754,
    alt: `${title}, лист ${sheet}`,
  };
}

function render(
  n: string,
  room: string,
  orientation: "landscape" | "portrait" = "landscape",
  height = 800,
): Render {
  const portrait = orientation === "portrait";
  return {
    room,
    src: `${BASE}/renders/${n}.webp`,
    width: portrait ? 800 : 1280,
    height: portrait ? 1280 : height,
    alt: `Визуализация: ${room}`,
  };
}

const cover: ImageAsset = {
  src: `${BASE}/cover.webp`,
  width: 1280,
  height: 800,
  alt: "Мастер-спальня, проект «Новый Сити Бей»",
};

export const projects: Project[] = [
  {
    slug: "novyi-siti-bey",
    title: "Новый Сити Бей",
    city: "Москва",
    year: 2025,
    area: 86,
    type: "apartment",
    style: "Тёмный контемпорари",
    summary:
      "Двухкомнатная квартира с перепланировкой: мастер-спальня получила собственный санузел и гардеробную за стеклянной перегородкой. Графитовые панели, оливковые фасады и красный ковёр создают спокойный глубокий контраст.",
    cover,
    moodboard: [],
    drawings: [
      drawing("03", "Обмерный план"),
      drawing("04", "Демонтажный план"),
      drawing("05", "Монтажный план"),
      drawing("06", "План перепланировки"),
      drawing("07", "План сантехники"),
      drawing("08", "План напольного покрытия"),
      drawing("09", "План тёплого пола"),
      drawing("10", "План мебели"),
      drawing("11", "План розеточных групп"),
      drawing("12", "План осветительных приборов"),
      drawing("13", "План освещения"),
      drawing("14", "План потолка"),
      drawing("15", "План отделки стен"),
      drawing("16", "Развертки санузла"),
      drawing("17", "Спецификация мебели"),
      drawing("18", "Спецификация мебели №2"),
      drawing("19", "Спецификация мебели №3"),
    ],
    renders: [
      render("01", "Мастер-спальня"),
      render("02", "Мастер-спальня"),
      render("03", "Мастер-спальня", "landscape", 727),
      render("04", "Мастер-спальня"),
      render("05", "Мастер-спальня"),
      render("06", "Мастер-спальня"),
      render("07", "Санузел", "portrait"),
      render("08", "Санузел", "portrait"),
      render("09", "Санузел", "portrait"),
      render("10", "Санузел", "portrait"),
      render("11", "Гардеробная", "portrait"),
      render("12", "Гардеробная", "portrait"),
    ],
    credits: [
      { role: "Дизайн и чертежи", name: "Малика Курманалиева" },
      { role: "Визуализация", name: "Амина Маматибраимова" },
    ],
    beforeAfter: {
      before: drawing("03", "Обмерный план"),
      after: drawing("06", "План перепланировки"),
    },
  },
];

export const projectTypeLabels: Record<ProjectType | "all", string> = {
  all: "Все",
  apartment: "Квартиры",
  house: "Дома",
  commercial: "Коммерция",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project {
  return projects[0];
}
