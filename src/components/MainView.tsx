import { useMemo, useState } from 'react';
import { useStore } from '../store/useStore';
import { getCalendarSeason } from '../utils/calendarSeason';
import { TodoList } from './TodoList';
import { StudyBar } from './StudyBar';
import { Garden } from './Garden';
import { EggSanctuary } from './EggSanctuary';
import { StorePanel } from './StorePanel';
import {
  SkyIconEgg,
  SkyIconGear,
  SkyIconStore,
  SkyIconStudy,
  SkyIconTodo,
} from './SkyHudPixelIcons';
import './MainView.css';

type Panel = 'none' | 'todo' | 'study' | 'sanctuary' | 'store';

export function MainView() {
  const [panel, setPanel] = useState<Panel>('none');
  const points = useStore((s) => s.points);
  const gardenUnlocked = useStore((s) => s.gardenUnlocked);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);
  const tutorialStage = useStore((s) => s.tutorialStage);
  const setTutorialStage = useStore((s) => s.setTutorialStage);

  const season = useMemo(() => getCalendarSeason(), []);

  const openPanel = (next: Panel) => {
    if (next === 'sanctuary' && tutorialStage === 'showSanctuaryArrow') {
      setTutorialStage('done');
    }
    setPanel((current) => (current === next ? 'none' : next));
  };

  const showSanctuaryArrow = tutorialStage === 'showSanctuaryArrow';

  return (
    <div className="main-view" data-season={season}>
      <section className="main-garden-area">
        <div className="main-sky-hud" role="toolbar" aria-label="Mochi Meadow tools">
          <div className="main-sky-icons">
            <div
              className="main-points-badge main-sky-btn-bob main-sky-bob--d0"
              aria-label={`Points: ${points}`}
            >
              <span className="main-points-label">Points</span>
              <span className="main-points-value">{points}</span>
            </div>
            <button
              type="button"
              className={`main-sky-btn main-sky-btn--todo ${panel === 'todo' ? 'is-active' : ''}`}
              onClick={() => openPanel('todo')}
              aria-label="Open to-do list"
            >
              <span className="main-sky-btn-bob main-sky-bob--d1">
                <SkyIconTodo />
              </span>
            </button>
            <button
              type="button"
              className={`main-sky-btn main-sky-btn--study ${panel === 'study' ? 'is-active' : ''}`}
              onClick={() => openPanel('study')}
              aria-label="Open study timer"
            >
              <span className="main-sky-btn-bob main-sky-bob--d2">
                <SkyIconStudy />
              </span>
            </button>
            <div className="main-sky-btn-cluster">
              <button
                type="button"
                className={`main-sky-btn main-sky-btn--egg ${panel === 'sanctuary' ? 'is-active' : ''}`}
                onClick={() => openPanel('sanctuary')}
                aria-label="Open pet egg sanctuary"
              >
                <span className="main-sky-btn-bob main-sky-bob--d3">
                  <SkyIconEgg />
                </span>
              </button>
              {showSanctuaryArrow && (
                <div className="egg-hint" aria-hidden>
                  <span className="egg-hint-arrow">⬆︎</span>
                  <span className="egg-hint-text">Tap to visit the egg sanctuary</span>
                </div>
              )}
            </div>
            <button
              type="button"
              className={`main-sky-btn main-sky-btn--store ${panel === 'store' ? 'is-active' : ''}`}
              onClick={() => openPanel('store')}
              aria-label="Open store"
            >
              <span className="main-sky-btn-bob main-sky-bob--d4">
                <SkyIconStore />
              </span>
            </button>
            <button
              type="button"
              className="main-sky-btn main-sky-btn--gear"
              onClick={() => openPanel('none')}
              aria-label="Settings (coming soon)"
            >
              <span className="main-sky-btn-bob main-sky-bob--d5">
                <SkyIconGear />
              </span>
            </button>
          </div>
        </div>
        <Garden locked={!gardenUnlocked && tutorialStage === 'done'} onUnlockHint={checkGardenAccess} />
      </section>

      {panel !== 'none' && (
        <div className="main-panel">
          {panel === 'todo' && <TodoList />}
          {panel === 'study' && <StudyBar />}
          {panel === 'sanctuary' && <EggSanctuary />}
          {panel === 'store' && <StorePanel />}
        </div>
      )}
    </div>
  );
}
