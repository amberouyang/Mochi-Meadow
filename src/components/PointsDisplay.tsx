import { useStore } from '../store/useStore';
import './PointsDisplay.css';

export function PointsDisplay() {
  const points = useStore((s) => s.points);
  return (
    <div className="points-display">
      <span className="points-label">Points</span>
      <span className="points-value">{points}</span>
    </div>
  );
}
