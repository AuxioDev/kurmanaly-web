import type { Locale } from "../config";
import { az } from "./az";
import { en } from "./en";
import { ky } from "./ky";
import { ru, type Dictionary } from "./ru";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { ru, en, ky, az };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
