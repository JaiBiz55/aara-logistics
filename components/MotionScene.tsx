'use client';

import { useEffect, useRef, useState } from 'react';
import { pauseBackgroundVideo, playBackgroundVideo } from '@/components/videoPlayback';

type MotionSceneProps = {
  mode?: 'hero' | 'warehouse' | 'network';
  clipSrc: string;
  clipStartSeconds?: number;
  clipEndSeconds?: number;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
};

export default function MotionScene({ mode = 'hero', clipSrc, clipStartSeconds = 0, clipEndSeconds }: MotionSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const durationTimeRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef(0);
  const isPriority = mode === 'hero';
  const [nearViewport, setNearViewport] = useState(isPriority);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualMotion, setManualMotion] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      setVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '480px 0px' },
    );
    const playbackObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    preloadObserver.observe(node);
    playbackObserver.observe(node);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  const sourceAttached = isPriority || nearViewport;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible && playing && (!reducedMotion || manualMotion)) {
      void playBackgroundVideo(video).catch(() => setPlaying(false));
    } else {
      pauseBackgroundVideo(video);
    }

    return () => pauseBackgroundVideo(video);
  }, [clipSrc, sourceAttached, visible, playing, reducedMotion, manualMotion]);

  const isPlaying = playing && (!reducedMotion || manualMotion);

  const togglePlayback = () => {
    const nextPlaying = !isPlaying;
    setPlaying(nextPlaying);
    if (nextPlaying && reducedMotion) setManualMotion(true);
  };

  const updateTimeline = (elapsed: number) => {
    if (currentTimeRef.current) currentTimeRef.current.textContent = formatTime(elapsed);
    const duration = durationRef.current;
    if (progressRef.current) {
      const percent = duration ? Math.min(100, (elapsed / duration) * 100) : 0;
      progressRef.current.style.width = `${percent}%`;
    }
  };

  const visualTitle = mode === 'warehouse' ? 'WAREHOUSE FLOW' : mode === 'network' ? 'CONNECTED NETWORK' : 'AARA IN MOTION';

  return (
    <div className={`motionScene motionScene-${mode}${visible ? ' is-visible' : ''}`} ref={sceneRef}>
      {sourceAttached && (
        <video
          key={clipSrc}
          ref={videoRef}
          className="motionSceneVideo"
          src={clipSrc}
          muted
          loop={clipEndSeconds === undefined}
          playsInline
          preload={isPriority ? 'auto' : 'metadata'}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            const end = clipEndSeconds === undefined ? video.duration : Math.min(clipEndSeconds, video.duration);
            durationRef.current = Math.max(0, end - clipStartSeconds);
            if (durationTimeRef.current) durationTimeRef.current.textContent = formatTime(durationRef.current);
            video.currentTime = Math.min(clipStartSeconds, Math.max(0, video.duration - 0.1));
            updateTimeline(0);
          }}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            const end = clipEndSeconds === undefined ? video.duration : Math.min(clipEndSeconds, video.duration);
            if (clipEndSeconds !== undefined && video.currentTime >= end) {
              video.currentTime = Math.min(clipStartSeconds, Math.max(0, end - 0.1));
              updateTimeline(0);
              return;
            }
            updateTimeline(Math.max(0, video.currentTime - clipStartSeconds));
          }}
          onEnded={(event) => {
            if (clipEndSeconds === undefined) return;
            const video = event.currentTarget;
            video.currentTime = Math.min(clipStartSeconds, Math.max(0, video.duration - 0.1));
            updateTimeline(0);
            if (isPlaying) void playBackgroundVideo(video).catch(() => setPlaying(false));
          }}
        />
      )}
      <div className="motionSceneShade" />
      <div className="motionSceneGrid" aria-hidden="true" />
      <div className="motionSceneScan" aria-hidden="true" />

      <div className="motionSceneTopline" aria-hidden="true">
        <span><i /> {visualTitle}</span>
        <span>LIVE ROUTE <b>●</b></span>
      </div>

      <svg className="motionRoute" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
        <path className="motionRouteTrack" d="M90 520 C250 520 265 390 430 390 S610 480 755 355 S975 235 1110 235" />
        <path className="motionRouteFlow" d="M90 520 C250 520 265 390 430 390 S610 480 755 355 S975 235 1110 235" />
        <circle className="motionRouteNode motionRouteNodeStart" cx="90" cy="520" r="9" />
        <circle className="motionRouteNode" cx="430" cy="390" r="7" />
        <circle className="motionRouteNode" cx="755" cy="355" r="7" />
        <circle className="motionRouteNode motionRouteNodeEnd" cx="1110" cy="235" r="9" />
      </svg>

      <div className="motionSceneHud" aria-hidden="true">
        <span className="motionSceneCrosshair">+</span>
        <span className="motionSceneCoordinates">12°58' N<br />77°35' E</span>
        <span className="motionSceneCorner motionSceneCornerTop" />
        <span className="motionSceneCorner motionSceneCornerBottom" />
      </div>

      <div className="motionSceneControls">
        <div className="motionSceneProgress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
        <span className="motionSceneTime"><span ref={currentTimeRef}>00:00</span> <i>/</i> <span ref={durationTimeRef}>00:00</span></span>
        <button className="motionScenePlay" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause motion clip' : 'Play motion clip'}>
          {isPlaying ? <span className="pauseGlyph" /> : <span className="playGlyph" />}
        </button>
      </div>
    </div>
  );
}
