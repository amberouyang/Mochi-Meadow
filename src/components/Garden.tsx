import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import './Garden.css';

type GardenProps = { locked: boolean; onUnlockHint: () => void };

export function Garden({ locked, onUnlockHint }: GardenProps) {
  const pets = useStore((s) => s.pets);
  const feedPet = useStore((s) => s.feedPet);
  const points = useStore((s) => s.points);
  const spendPoints = useStore((s) => s.spendPoints);

  const tutorialStage = useStore((s) => s.tutorialStage);
  const debris = useStore((s) => s.debris);
  const clearDebris = useStore((s) => s.clearDebris);
  const awardIntroPointsIfNeeded = useStore((s) => s.awardIntroPointsIfNeeded);
  const studyMinutesGoal = useStore((s) => s.studyMinutesGoal);
  const studyMinutesToday = useStore((s) => s.studyMinutesToday);

  const [showAccessDialog, setShowAccessDialog] = useState(false);

  useEffect(() => {
    if (tutorialStage === 'introMeadow') {
      // For now, move straight into the clearing tutorial after the first intro visit.
      useStore.setState({ tutorialStage: 'clearDebris' });
    }
  }, [tutorialStage]);

  if (locked) {
    return (
      <div className="garden garden-locked">
        <div className="garden-meadow-bg" aria-hidden>
          <div className="garden-sun">
            <span className="garden-sun-face">◠‿◠</span>
          </div>
          <div className="garden-cloud garden-cloud-1" />
          <div className="garden-cloud garden-cloud-2" />
          <div className="garden-cloud garden-cloud-3" />
          <div className="garden-grass" />
          <div className="garden-flower garden-flower-1">🌸</div>
          <div className="garden-flower garden-flower-2">🌷</div>
          <div className="garden-flower garden-flower-3">🌼</div>
          <div className="garden-flower garden-flower-4">🦋</div>
          <div className="garden-flower garden-flower-5">✨</div>
        </div>
        <div className="garden-lock-message">
          <span className="garden-lock-emojis">🌿 🌸 ✨ 🌿</span>
          <p className="garden-lock-title">Your meadow is waiting ~</p>
          <p className="garden-lock-text">
            Finish your tasks or meet your study goal to unlock the garden and visit your mochi pets.
          </p>
          <button className="garden-lock-btn" onClick={() => setShowAccessDialog(true)}>
            See if the garden is open
          </button>
        </div>
        {showAccessDialog && (
          <div className="garden-access-overlay">
            <div className="garden-access-card">
              <p className="garden-access-title">Garden access</p>
              <p className="garden-access-text">
                Today&apos;s study goal: {studyMinutesGoal} minutes.
                <br />
                Studied so far: {studyMinutesToday} minutes.
              </p>
              <div className="garden-access-actions">
                <button
                  type="button"
                  className="garden-access-btn garden-access-btn-secondary"
                  onClick={() => setShowAccessDialog(false)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="garden-access-btn"
                  onClick={() => {
                    onUnlockHint();
                    setShowAccessDialog(false);
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const isClearingTutorial = tutorialStage === 'clearDebris';

  return (
    <div className="garden garden-unlocked">
      <div className="garden-meadow-bg" aria-hidden>
        <div className="garden-sun garden-sun-unlocked">
          <span className="garden-sun-face">◠‿◠</span>
        </div>
        <div className="garden-cloud garden-cloud-1" />
        <div className="garden-cloud garden-cloud-2" />
        <div className="garden-grass" />
        <div className="garden-flower garden-flower-1">🌸</div>
        <div className="garden-flower garden-flower-2">🌷</div>
        <div className="garden-flower garden-flower-3">🌼</div>

        {isClearingTutorial &&
          debris
            .filter((d) => !d.cleared)
            .map((d) => (
              <button
                key={d.id}
                type="button"
                className={`garden-debris garden-debris-${d.kind}`}
                onClick={() => {
                  clearDebris(d.id);
                  awardIntroPointsIfNeeded();
                }}
              >
                {d.kind === 'rock' && '🪨'}
                {d.kind === 'tree' && '🌳'}
                {d.kind === 'rubble' && '🧱'}
              </button>
            ))}
      </div>

      {isClearingTutorial && (
        <div className="garden-tutorial-card">
          <p className="garden-tutorial-title">Your meadow is a little messy...</p>
          <p className="garden-tutorial-text">
            Tap the rocks, tree, and rubble to clear space for your future garden. You&apos;ll get
            100 starter points once everything is cleaned up.
          </p>
        </div>
      )}

      <div className="garden-shelter">
        <div className="shelter-house" />
        <div className="garden-pets">
          {pets.map((p) => (
            <div key={p.id} className={`pet pet-${p.mood}`} title={p.name}>
              <div className="pet-mochi">
                <span className="pet-blush" />
              </div>
              <span className="pet-name">{p.name}</span>
              <div className="pet-energy">
                <div className="pet-energy-bar" style={{ width: `${p.energy}%` }} />
              </div>
              <button
                className="pet-feed"
                disabled={points < 5}
                onClick={() => spendPoints(5) && feedPet(p.id)}
              >
                Feed (5 pts) 🍡
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="garden-mist-hint">~ Lock the garden and spray mist to heal pets (coming soon) ~</p>
    </div>
  );
}
