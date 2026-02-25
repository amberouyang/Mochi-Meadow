import { useStore } from '../store/useStore';
import './OverlayView.css';

export function OverlayView() {
  const pets = useStore((s) => s.pets);
  const studyState = useStore((s) => s.studyState);
  const firstPet = pets[0];
  const mood = studyState === 'studying' ? 'happy' : 'sad';

  if (!firstPet) return null;

  return (
    <div className="overlay-view" data-mood={mood}>
      <div className="overlay-mochi" />
      <p className="overlay-message">
        {mood === 'sad' ? "Lock in! I'm waiting for you to study." : "You're doing great!"}
      </p>
    </div>
  );
}
