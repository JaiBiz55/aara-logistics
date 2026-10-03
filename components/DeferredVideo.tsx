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
  const [nearViewport, setNearViewport] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      setVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '560px 0px' },
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
    if (!video) return;

    if (visible) void playBackgroundVideo(video).catch(() => {});
    else pauseBackgroundVideo(video);

    return () => pauseBackgroundVideo(video);
  }, [nearViewport, visible, src]);

  return (
    <video
      ref={ref}
      src={nearViewport ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={nearViewport ? 'metadata' : 'none'}
    />
  );
}
