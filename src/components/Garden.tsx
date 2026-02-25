import { useStore } from '../store/useStore';
import './Garden.css';

type GardenProps = { locked: boolean; onUnlockHint: () => void };

export function Garden({ locked, onUnlockHint }: GardenProps) {
  const pets = useStore((s) => s.pets);
  const feedPet = useStore((s) => s.feedPet);
  const points = useStore((s) => s.points);
  const spendPoints = useStore((s) => s.spendPoints);

  if (locked) {
    return (
      <div className="garden garden-locked">
        <div className="garden-lock-message">
          <p className="garden-lock-title">Garden locked</p>
          <p className="garden-lock-text">
            Finish all your tasks or meet your study goal to unlock the garden and visit your mochi
            pets.
          </p>
          <button onClick={onUnlockHint}>Check again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="garden garden-unlocked">
      <div className="garden-shelter">
        <div className="shelter-house" />
        <div className="garden-pets">
          {pets.map((p) => (
            <div key={p.id} className={`pet pet-${p.mood}`} title={p.name}>
              <div className="pet-mochi" />
              <span className="pet-name">{p.name}</span>
              <div className="pet-energy">
                <div className="pet-energy-bar" style={{ width: `${p.energy}%` }} />
              </div>
              <button
                className="pet-feed"
                disabled={points < 5}
                onClick={() => spendPoints(5) && feedPet(p.id)}
              >
                Feed (5 pts)
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="garden-mist-hint">Lock the garden and spray mist to heal pets (coming soon).</p>
    </div>
  );
}
