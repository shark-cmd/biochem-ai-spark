import React, { useEffect, useMemo, useState } from "react";
import heroImg from "@/assets/hero-biochem.jpg";

// A lightweight, elegant slideshow for the hero section.
// - Crossfades between slides
// - Subtle Ken Burns (zoom) effect on the active slide
// - Respects reduced motion preferences
export default function HeroSlideshow({ interval = 4500 }: { interval?: number }) {
  const slides = useMemo(
    () => [
      { className: "", alt: "Biochemistry molecules gradient hero" },
      { className: "filter hue-rotate-30 saturate-150", alt: "Biochemistry molecules gradient hero variant" },
      { className: "filter hue-rotate-60 brightness-110 contrast-110", alt: "Biochemistry molecules gradient hero variant" },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : { matches: false } as MediaQueryList;

    if (mq.matches) return; // Respect reduced motion: no automatic slide changes

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval, slides.length]);

  return (
    <div className="relative rounded-xl border border-border shadow-lg overflow-hidden animate-scale-in">
      {/* Stacked images with crossfade */}
      {slides.map((s, i) => {
        const isActive = i === index;
        return (
          <img
            key={i}
            src={heroImg}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={[
              "absolute inset-0 h-full w-full object-cover",
              // Crossfade
              "transition-opacity motion-safe:duration-700",
              isActive ? "opacity-100" : "opacity-0",
              // Subtle Ken Burns zoom on active slide
              "motion-safe:transition-transform motion-safe:duration-[4000ms]",
              isActive ? "scale-105" : "scale-100",
              s.className,
            ].join(" ")}
          />
        );
      })}
      {/* Aspect ratio guard for layout stability */}
      <div aria-hidden className="invisible" style={{ paddingBottom: "66.6667%" }} />
    </div>
  );
}
