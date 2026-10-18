"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { luxuryEase } from "@/lib/motion";

interface ParallaxCoverProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}

/** Обложка: плавное проявление при загрузке и лёгкий параллакс при прокрутке. */
export function ParallaxCover({ src, alt, sizes, priority }: ParallaxCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ duration: 1.4, ease: luxuryEase }}
        className="absolute inset-x-0 -top-[10%] h-[120%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
