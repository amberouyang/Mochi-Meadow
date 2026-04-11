import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import welcomeUrl from '../assets/mm-welcome.png';
import './IntroScreen.css';

type IntroScreenProps = {
  /** Called when the player chooses Play — continues into the meadow flow (name + bonus). */
  onPlay: () => void;
};

/** Full-screen rect for hit targets — art uses object-fit: cover so it fills this area. */
function measureArtRect(container: HTMLElement): DOMRectReadOnly {
  return container.getBoundingClientRect();
}

export function IntroScreen({ onPlay }: IntroScreenProps) {
  const [learnOpen, setLearnOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [artRect, setArtRect] = useState<DOMRectReadOnly | null>(null);

  const updateArtRect = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    setArtRect(measureArtRect(c));
  }, []);

  useLayoutEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    updateArtRect();
    const ro = new ResizeObserver(() => updateArtRect());
    ro.observe(c);
    window.addEventListener('resize', updateArtRect);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateArtRect);
    };
  }, [updateArtRect]);

  return (
    <div className="intro-screen" ref={containerRef}>
      <img
        ref={imgRef}
        src={welcomeUrl}
        alt=""
        className="intro-welcome-art"
        draggable={false}
        onLoad={updateArtRect}
      />

      {artRect && (
        <div
          className="intro-hit-root"
          style={{
            position: 'fixed',
            left: artRect.left,
            top: artRect.top,
            width: artRect.width,
            height: artRect.height,
          }}
        >
          <div className="intro-hit-row">
            <button
              type="button"
              className="intro-hit-btn intro-hit-btn--play"
              aria-label="Play"
              onClick={onPlay}
            />
            <button
              type="button"
              className="intro-hit-btn intro-hit-btn--learn"
              aria-label="Learn more"
              onClick={() => setLearnOpen(true)}
            />
          </div>
        </div>
      )}

      {learnOpen && (
        <div
          className="intro-learn-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-learn-title"
        >
          <div className="intro-learn-card">
            <h2 id="intro-learn-title" className="intro-learn-title">
              About Mochi Meadow
            </h2>
            <p className="intro-learn-text">
              A cozy study companion: earn points from tasks and study time, then feed and care for
              your mochi pets in the meadow.
            </p>
            <button type="button" className="intro-learn-close" onClick={() => setLearnOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
