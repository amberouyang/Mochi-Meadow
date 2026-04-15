import { useEffect, useState } from 'react';
import {
  MEADOW_CENTER_ROCK_SIZE_PX,
  MEADOW_CENTER_ROCKS_LAYOUT,
  ROCK_ASSETS,
  RUBBLE_PILE_LAYERS,
} from '../meadowRocks';
import { useStore } from '../store/useStore';
import { MeadowPanBackground } from './MeadowPanBackground';
import './Garden.css';

/** Fixed to the meadow viewport — does not pan with the background image. */
function MeadowRockScatter() {
  return (
    <div className="meadow-scatter-layer">
      {MEADOW_CENTER_ROCKS_LAYOUT.map((p, i) => (
        <img
          key={i}
          src={ROCK_ASSETS[p.assetIndex]}
          alt=""
          className="meadow-scatter-rock"
          draggable={false}
          style={{
            left: `${p.leftPct}%`,
            bottom: `${p.bottomPct}%`,
            width: MEADOW_CENTER_ROCK_SIZE_PX,
            transform: `translateX(-50%) rotate(${p.rotDeg}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function debrisRockSrc(kind: 'rock' | 'tree') {
  if (kind === 'rock') return ROCK_ASSETS[0];
  return ROCK_ASSETS[3];
}

function RubblePileImages() {
  return (
    <div className="garden-debris-pile">
      {RUBBLE_PILE_LAYERS.map((layer, i) => (
        <img
          key={i}
          src={ROCK_ASSETS[layer.assetIndex]}
          alt=""
          className="garden-debris-pile-img"
          draggable={false}
          style={{
            left: `${layer.leftPct}%`,
            bottom: `${layer.bottomPct}%`,
            width: `${layer.widthPct}%`,
            transform: `rotate(${layer.rotDeg}deg)`,
            zIndex: layer.z,
          }}
        />
      ))}
    </div>
  );
}

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
  const welcomeBonusClaimed = useStore((s) => s.welcomeBonusClaimed);

  const [showAccessDialog, setShowAccessDialog] = useState(false);

  useEffect(() => {
    if (tutorialStage === 'introMeadow') {
      // Only start the tutorial after the user collects their first 50 points.
      if (welcomeBonusClaimed) {
        useStore.setState({ tutorialStage: 'clearDebris' });
      }
    }
  }, [tutorialStage, welcomeBonusClaimed]);

  if (locked) {
    return (
      <div className="garden garden-locked">
        <div className="garden-meadow-bg" aria-hidden>
          <MeadowPanBackground />
          <MeadowRockScatter />
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
  const [hideTutorialCard, setHideTutorialCard] = useState(false);

  useEffect(() => {
    // Reset hidden state if we ever leave and re-enter this stage
    if (!isClearingTutorial) {
      setHideTutorialCard(false);
    }
  }, [isClearingTutorial]);

  return (
    <div className="garden garden-unlocked">
      <div className="garden-meadow-bg" aria-hidden>
        <MeadowPanBackground />
        <MeadowRockScatter />

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
                <span className="garden-debris-arrow" aria-hidden>
                  ⬇︎
                </span>
                {d.kind === 'rubble' ? (
                  <RubblePileImages />
                ) : (
                  <img
                    src={debrisRockSrc(d.kind)}
                    alt=""
                    className="garden-debris-img"
                    draggable={false}
                  />
                )}
              </button>
            ))}
      </div>

      {isClearingTutorial && !hideTutorialCard && (
        <div className="garden-tutorial-overlay">
          <div className="garden-tutorial-card">
            <div className="garden-tutorial-card-chrome">
              <button
                type="button"
                className="garden-tutorial-close"
                onClick={() => setHideTutorialCard(true)}
                aria-label="Close tutorial"
              >
                ×
              </button>
              <p className="garden-tutorial-message">
                <strong>Oh no!</strong>{' '}
                Some rumbly rubble is blocking the way! Help your Mochi clear the path to earn 100 starter points.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="garden-shelter">
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
    </div>
  );
}
