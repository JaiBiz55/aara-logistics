'use client';

import { useEffect, useRef, useState } from 'react';

export default function ServiceTourVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '80px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="serviceTourVisual" ref={ref}>
      {visible && <video src={src} muted loop autoPlay playsInline preload="none" aria-label={`${label} service footage`} />}
      <div className="serviceTourVisualShade" />
      <span className="serviceTourVisualLabel">AARA IN MOTION</span>
      <span className="serviceTourVisualIndex">{label}</span>
    </div>
  );
}
