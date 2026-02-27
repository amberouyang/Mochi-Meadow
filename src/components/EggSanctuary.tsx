import { useStore } from '../store/useStore';
import './EggSanctuary.css';

export function EggSanctuary() {
  const eggProgress = useStore((s) => s.eggProgress);
  const eggHatched = useStore((s) => s.eggHatched);
  const pets = useStore((s) => s.pets);

  const pct = Math.round((eggProgress / 1000) * 100);

  return (
    <div className="egg-sanctuary">
      <h2 className="egg-title">Pet egg sanctuary</h2>
      {!eggHatched ? (
        <>
          <p className="egg-text">
            Study and complete tasks to fill your egg. When it reaches 100%, a mochi pet will hatch
            and join your meadow.
          </p>
          <div className="egg-visual">
            <div className="egg-outer">
              <div className="egg-inner">
                <span className="egg-face">・‿・</span>
              </div>
            </div>
            <div className="egg-progress">
              <div className="egg-progress-bar" style={{ width: `${pct}%` }} />
            </div>
            <span className="egg-progress-label">{pct}% to hatch</span>
          </div>
        </>
      ) : (
        <>
          <p className="egg-text">
            Your mochi pet has hatched! You&apos;ll be able to move them around your meadow as you
            upgrade their home.
          </p>
          <div className="egg-hatched">
            <div className="egg-hatched-mochi" />
            <span className="egg-hatched-name">
              {pets[0]?.name ?? 'Your first mochi'}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

