import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

/** Достаёт язык из params страницы; неизвестный язык даёт 404. */
export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}
