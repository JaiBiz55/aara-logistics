'use client';

import { useEffect, useRef, useState } from 'react';

type MotionSceneProps = {
  mode?: 'hero' | 'warehouse' | 'network';
  clipSrc?: string;
  clipLabel?: string;
};

const clips = [
  { src: '/media/motion/movement-01.mp4', label: 'MOVEMENT 01' },
  { src: '/media/motion/movement-02.mp4', label: 'MOVEMENT 02' },
  { src: '/media/motion/movement-03.mp4', label: 'MOVEMENT 03' },
];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
};

export default function MotionScene({ mode = 'hero', clipSrc, clipLabel }: MotionSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualMotion, setManualMotion] = useState(false);
  const [activeClip, setActiveClip] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const sceneClips = clipSrc ? [{ src: clipSrc, label: clipLabel ?? 'SERVICE VISUAL' }] : clips;

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '160px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && playing && (!reducedMotion || manualMotion)) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [visible, playing, reducedMotion, manualMotion, activeClip]);

  const isPlaying = playing && (!reducedMotion || manualMotion);

  const togglePlayback = () => {
    const nextPlaying = !isPlaying;
    setPlaying(nextPlaying);
    if (nextPlaying && reducedMotion) setManualMotion(true);
  };

  const selectClip = (index: number) => {
    if (index === activeClip) return;
    setActiveClip(index);
    setTime(0);
    setDuration(0);
    setPlaying(true);
    setManualMotion(false);
  };

  const visualTitle = mode === 'warehouse' ? 'WAREHOUSE FLOW' : mode === 'network' ? 'CONNECTED NETWORK' : 'AARA IN MOTION';

  return (
    <div className={`motionScene motionScene-${mode}`} ref={sceneRef}>
      {visible && (
        <video
          key={sceneClips[activeClip].src}
          ref={videoRef}
          className="motionSceneVideo"
          src={sceneClips[activeClip].src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
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
        {sceneClips.length > 1 && <div className="motionSceneClipSelect" aria-label="Select motion clip">
          {sceneClips.map((clip, index) => (
            <button
              className={index === activeClip ? 'active' : ''}
              key={clip.src}
              type="button"
              onClick={() => selectClip(index)}
              aria-label={`Show ${clip.label.toLowerCase()}`}
              aria-pressed={index === activeClip}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>}
        <div className="motionSceneProgress" aria-hidden="true">
          <span style={{ width: `${duration ? Math.min(100, (time / duration) * 100) : 0}%` }} />
        </div>
        <span className="motionSceneTime">{formatTime(time)} <i>/</i> {formatTime(duration)}</span>
        <button className="motionScenePlay" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause motion clip' : 'Play motion clip'}>
          {isPlaying ? <span className="pauseGlyph" /> : <span className="playGlyph" />}
        </button>
      </div>
    </div>
  );
}
