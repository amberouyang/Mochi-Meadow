import { useState } from 'react';
import { useStore } from '../store/useStore';
import { TodoList } from './TodoList';
import { StudyBar } from './StudyBar';
import { Garden } from './Garden';
import { EggSanctuary } from './EggSanctuary';
import { StorePanel } from './StorePanel';
import './MainView.css';

type Panel = 'none' | 'todo' | 'study' | 'sanctuary' | 'store';

export function MainView() {
  const [panel, setPanel] = useState<Panel>('none');
  const gardenUnlocked = useStore((s) => s.gardenUnlocked);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);
  const tutorialStage = useStore((s) => s.tutorialStage);
  const setTutorialStage = useStore((s) => s.setTutorialStage);

  const openPanel = (next: Panel) => {
    if (next === 'sanctuary' && tutorialStage === 'showSanctuaryArrow') {
      setTutorialStage('done');
    }
    setPanel((current) => (current === next ? 'none' : next));
  };

  const showSanctuaryArrow = tutorialStage === 'showSanctuaryArrow';

  return (
    <div className="main-view">
      <section className="main-garden-area">
        <div className="main-sky-hud" role="toolbar" aria-label="Mochi Meadow tools">
          <div className="main-sky-icons">
            <button
              type="button"
              className={`main-sky-btn main-sky-btn--todo ${panel === 'todo' ? 'is-active' : ''}`}
              onClick={() => openPanel('todo')}
              aria-label="Open to-do list"
            >
              📝
            </button>
            <button
              type="button"
              className={`main-sky-btn main-sky-btn--study ${panel === 'study' ? 'is-active' : ''}`}
              onClick={() => openPanel('study')}
              aria-label="Open study timer"
            >
              ⏱
            </button>
            <div className="main-sky-btn-cluster">
              <button
                type="button"
                className={`main-sky-btn main-sky-btn--egg ${panel === 'sanctuary' ? 'is-active' : ''}`}
                onClick={() => openPanel('sanctuary')}
                aria-label="Open pet egg sanctuary"
              >
                🥚
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
              🛒
            </button>
            <button
              type="button"
              className="main-sky-btn main-sky-btn--gear"
              onClick={() => openPanel('none')}
              aria-label="Settings (coming soon)"
            >
              ⚙️
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
