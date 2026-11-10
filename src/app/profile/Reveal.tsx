"use client";

import { useEffect } from "react";

const OBSERVER_TIMEOUT_MS = 2000;

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const show = (el: Element) => el.classList.add("is-visible");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach(show);
      return;
    }

    let observerFired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        observerFired = true;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );

    const viewportHeight = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportHeight) show(el);
      else observer.observe(el);
    });
    root.classList.add("reveal-ready");

    // Safety net: an observer always reports its initial state, so silence means it is broken.
    const fallback = window.setTimeout(() => {
      if (!observerFired) targets.forEach(show);
    }, OBSERVER_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
