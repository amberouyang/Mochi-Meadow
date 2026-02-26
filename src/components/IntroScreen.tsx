import { useEffect, useState } from 'react';
import './IntroScreen.css';

type IntroScreenProps = {
  onComplete: () => void;
  durationMs?: number;
  fadeMs?: number;
};

export function IntroScreen({
  onComplete,
  durationMs = 5000,
  fadeMs = 1200,
}: IntroScreenProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startFade = setTimeout(() => setFading(true), durationMs - fadeMs);
    const finish = setTimeout(onComplete, durationMs);
    return () => {
      clearTimeout(startFade);
      clearTimeout(finish);
    };
  }, [onComplete, durationMs, fadeMs]);

  return (
    <div className={`intro-screen ${fading ? 'intro-screen--fade' : ''}`} aria-hidden={fading}>
      <div className="intro-bg" />
      <div className="intro-content">
        <span className="intro-sparkle intro-sparkle-1">✨</span>
        <span className="intro-sparkle intro-sparkle-2">🌸</span>
        <h1 className="intro-title">Welcome to Mochi Meadow!</h1>
        <p className="intro-sub">Study hard, grow your pets ~</p>
        <span className="intro-sparkle intro-sparkle-3">✨</span>
      </div>
    </div>
  );
}
