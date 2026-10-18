"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

/** Гасит скелетон у ближайшего контейнера `.skeleton`, когда картинка загрузилась. */
function markLoaded(img: HTMLImageElement) {
  img.closest(".skeleton")?.setAttribute("data-loaded", "true");
}

/**
 * Обёртка над next/image: картинка плавно проявляется по факту загрузки,
 * пока она грузится, виден скелетон контейнера (класс `.skeleton`).
 */
export function FadeImage({ className = "", onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Закэшированная картинка могла загрузиться до гидратации: onLoad уже не сработает
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) {
      markLoaded(img);
      setLoaded(true);
    }
  }, []);

  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      data-fade
      onLoad={(e) => {
        markLoaded(e.currentTarget);
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${className} transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
