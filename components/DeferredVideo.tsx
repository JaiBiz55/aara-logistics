'use client';

import { useEffect, useRef, useState } from 'react';
import { pauseBackgroundVideo, playBackgroundVideo } from '@/components/videoPlayback';

export default function DeferredVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      setVisible(true);
      return;
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
    const playbackObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    preloadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldLoad) return;

    if (visible) {
      void playBackgroundVideo(video).catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error(`Unable to play portfolio video: ${src}`, error);
      });
    }
    else pauseBackgroundVideo(video);

    return () => pauseBackgroundVideo(video);
  }, [shouldLoad, visible, src]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={shouldLoad ? 'auto' : 'none'}
    />
  );
}
