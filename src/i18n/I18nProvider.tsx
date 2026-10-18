"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";

interface I18nValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Передаёт язык и словарь клиентским компонентам (серверные получают их через props). */
export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
