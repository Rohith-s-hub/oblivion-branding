import { useEffect, useRef, useState } from 'react';

const loopStartFrame = 0;
const loopEndFrame = 30;
const sourceFrameDelay = 30;
const loopFrameDelay = 60;

export default function BlackHoleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useGifFallback, setUseGifFallback] = useState(false);

  useEffect(() => {
    if (typeof ImageDecoder === 'undefined') {
      setUseGifFallback(true);
      return;
    }

    let cancelled = false;
    let timer = 0;
    let decoder: ImageDecoder | undefined;
    let frameIndex = 0;
    let loopStarted = false;

    const play = async () => {
      try {
        const response = await fetch('/models/blackhole.gif');
        if (!response.ok) throw new Error('Unable to load black hole animation');

        decoder = new ImageDecoder({ data: await response.arrayBuffer(), type: 'image/gif' });
        await decoder.tracks.ready;
        const track = decoder.tracks.selectedTrack;
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d', { alpha: true });
        if (!track || !canvas || !context) throw new Error('GIF frame decoding is unavailable');

        if (track.frameCount < loopEndFrame) throw new Error('GIF does not contain the requested loop segment');

        const drawNextFrame = async () => {
          if (cancelled || !decoder) return;
          const { image } = await decoder.decode({ frameIndex });
          if (cancelled) {
            image.close();
            return;
          }

          if (canvas.width !== image.displayWidth || canvas.height !== image.displayHeight) {
            canvas.width = image.displayWidth;
            canvas.height = image.displayHeight;
          }
          context.drawImage(image, 0, 0);
          image.close();

          const delay = loopStarted ? loopFrameDelay : sourceFrameDelay;
          if (!loopStarted && frameIndex === track.frameCount - 1) {
            loopStarted = true;
            frameIndex = loopStartFrame;
          } else if (loopStarted && frameIndex === loopEndFrame - 1) {
            frameIndex = loopStartFrame;
          } else {
            frameIndex += 1;
          }
          timer = window.setTimeout(() => void drawNextFrame(), delay);
        };

        await drawNextFrame();
      } catch {
        if (!cancelled) setUseGifFallback(true);
      }
    };

    void play();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      decoder?.close();
    };
  }, []);

  return (
    <div className="r-black-hole-gif" aria-hidden="true">
      {useGifFallback ? (
        <img src="/models/blackhole.gif" alt="" fetchPriority="high" />
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  );
}
