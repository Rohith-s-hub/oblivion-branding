import { useEffect, useRef } from 'react';

const tailStart = 2.7;
const tailEnd = 3.6;

export default function BlackHoleAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let frame = 0;
    const followPlayback = () => {
      const video = videoRef.current;
      if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        if (video.currentTime >= tailStart) video.playbackRate = 0.5;
        if (video.currentTime >= tailEnd - 0.015) video.currentTime = tailStart;
      }
      frame = window.requestAnimationFrame(followPlayback);
    };

    frame = window.requestAnimationFrame(followPlayback);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="r-black-hole-gif" aria-hidden="true">
      <video
        ref={videoRef}
        src="/models/blackhole-loop.webm"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
