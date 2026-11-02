'use client';

import { useEffect, useRef, useState } from 'react';
import { pauseBackgroundVideo, playBackgroundVideo } from '@/components/videoPlayback';

export default function ServiceTourVideo({
  src,
  label,
  playbackEnabled = true,
}: {
  src: string;
  label: string;
  playbackEnabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldPlay = isMobile ? focused : hovered;
  const isActive = shouldPlay && playbackEnabled;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mobileQuery = window.matchMedia('(hover: none) and (pointer: coarse), (max-width: 700px)');
    const updateMobile = () => setIsMobile(mobileQuery.matches);
    updateMobile();
    mobileQuery.addEventListener('change', updateMobile);

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return () => mobileQuery.removeEventListener('change', updateMobile);
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '1400px 0px' },
    );
    const focusMargin = Math.round(window.innerHeight * 0.4);
    const focusObserver = new IntersectionObserver(
      ([entry]) => setFocused(entry.isIntersecting),
      { rootMargin: `-${focusMargin}px 0px -${focusMargin}px 0px`, threshold: 0 },
    );
    preloadObserver.observe(node);
    focusObserver.observe(node);

    return () => {
      mobileQuery.removeEventListener('change', updateMobile);
      preloadObserver.disconnect();
      focusObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isActive) {
      void playBackgroundVideo(video).catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error(`Unable to play service preview video: ${src}`, error);
      });
    } else {
      pauseBackgroundVideo(video);
    }

    return () => pauseBackgroundVideo(video);
  }, [isActive, shouldLoad, src]);

  return (
    <div
      className="serviceTourVisual"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        muted
        loop
        playsInline
        preload={isActive ? 'auto' : shouldLoad ? 'metadata' : 'none'}
        aria-label={`${label} service footage`}
      />
      <div className="serviceTourVisualShade" />
      <span className="serviceTourVisualLabel">AARA IN MOTION</span>
    </div>
  );
}
