'use client';

import { useEffect, useRef, useState } from 'react';
import { pauseBackgroundVideo, playBackgroundVideo } from '@/components/videoPlayback';

export default function ServiceTourVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      setVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '420px 0px' },
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
    if (!video) return;

    if (visible) void playBackgroundVideo(video).catch(() => {});
    else pauseBackgroundVideo(video);

    return () => pauseBackgroundVideo(video);
  }, [nearViewport, visible]);

  return (
    <div className="serviceTourVisual" ref={ref}>
      <video
        ref={videoRef}
        src={nearViewport ? src : undefined}
        muted
        loop
        playsInline
        preload={nearViewport ? 'metadata' : 'none'}
        aria-label={`${label} service footage`}
      />
      <div className="serviceTourVisualShade" />
      <span className="serviceTourVisualLabel">AARA IN MOTION</span>
      <span className="serviceTourVisualIndex">{label}</span>
    </div>
  );
}
