'use client';

import { useEffect, useRef, useState } from 'react';

export default function DeferredVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      setNearViewport(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { rootMargin: '180px 0px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !loaded) return;

    if (nearViewport) void video.play().catch(() => {});
    else video.pause();
  }, [loaded, nearViewport]);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
