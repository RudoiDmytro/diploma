"use client";

import * as React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Styles from "./styles";

type CarouselProps = {
  children: React.ReactNode;
  label: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export default function MainCarousel({ children, label }: CarouselProps) {
  const t = useTranslations("A11y");
  const prefersReducedMotion = usePrefersReducedMotion();

  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const [carouselRef, api] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!api) {
      return;
    }
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  // Honour prefers-reduced-motion: stop autoplay when the user prefers reduced motion.
  React.useEffect(() => {
    const plugin = autoplay.current;
    if (!api || !plugin) {
      return;
    }
    if (prefersReducedMotion) {
      plugin.stop();
    } else {
      plugin.play();
    }
    setIsPlaying(plugin.isPlaying());
  }, [api, prefersReducedMotion]);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    api.on("autoplay:play", () => setIsPlaying(true));
    api.on("autoplay:stop", () => setIsPlaying(false));
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const toggleAutoplay = React.useCallback(() => {
    const plugin = autoplay.current;
    if (!plugin) {
      return;
    }
    if (plugin.isPlaying()) {
      plugin.stop();
    } else {
      plugin.play();
    }
    setIsPlaying(plugin.isPlaying());
  }, []);

  const slides = React.Children.toArray(children);

  return (
    <Box
      sx={Styles.region}
      onKeyDownCapture={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <Box ref={carouselRef} sx={Styles.viewport}>
        <Box sx={Styles.container}>
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={Styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
            >
              {slide}
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton
        sx={[Styles.navButton, Styles.prevButton]}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label={t("previous_slide")}
      >
        <ArrowBackIcon fontSize="small" aria-hidden="true" />
      </IconButton>

      <IconButton
        sx={[Styles.navButton, Styles.nextButton]}
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label={t("next_slide")}
      >
        <ArrowForwardIcon fontSize="small" aria-hidden="true" />
      </IconButton>

      <Box sx={Styles.toggleRow}>
        <IconButton
          sx={Styles.toggleButton}
          onClick={toggleAutoplay}
          aria-label={isPlaying ? t("pause_carousel") : t("play_carousel")}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <PauseIcon fontSize="small" aria-hidden="true" />
          ) : (
            <PlayArrowIcon fontSize="small" aria-hidden="true" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
