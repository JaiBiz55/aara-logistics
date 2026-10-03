'use client';

import { useEffect } from 'react';

export default function ScrollController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .serviceTourRow'));

    if (reducedMotion || touchDevice || !('IntersectionObserver' in window)) return;

    const initiallyVisible = new Set<HTMLElement>();
    const viewportHeight = window.innerHeight;
    for (const target of targets) {
      const bounds = target.getBoundingClientRect();
      if (bounds.top < viewportHeight * 0.92 && bounds.bottom > 0) {
        target.dataset.revealed = 'true';
        initiallyVisible.add(target);
      }
    }

    root.classList.add('scroll-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = 'true';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    for (const target of targets) {
      if (!initiallyVisible.has(target)) observer.observe(target);
    }

    return () => {
      root.classList.remove('scroll-ready');
      observer.disconnect();
    };
  }, []);

  return null;
}
