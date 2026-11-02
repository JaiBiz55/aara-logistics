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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
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
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35] },
    );
    preloadObserver.observe(node);
    playbackObserver.observe(node);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (visible && playbackEnabled) {
      void playBackgroundVideo(video).catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error(`Unable to play service preview video: ${src}`, error);
      });
    } else {
      pauseBackgroundVideo(video);
    }

    return () => pauseBackgroundVideo(video);
  }, [playbackEnabled, shouldLoad, src, visible]);

  return (
    <div className="serviceTourVisual" ref={ref}>
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        muted
        loop
        playsInline
        preload={shouldLoad ? 'auto' : 'none'}
        aria-label={`${label} service footage`}
      />
      <div className="serviceTourVisualShade" />
      <span className="serviceTourVisualLabel">AARA IN MOTION</span>
    </div>
  );
}
