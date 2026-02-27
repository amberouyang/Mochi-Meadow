import { useState } from 'react';
import { useStore } from '../store/useStore';
import { TodoList } from './TodoList';
import { StudyBar } from './StudyBar';
import { Garden } from './Garden';
import { PointsDisplay } from './PointsDisplay';
import { EggSanctuary } from './EggSanctuary';
import { StorePanel } from './StorePanel';
import './MainView.css';

type Panel = 'none' | 'todo' | 'study' | 'sanctuary' | 'store';

export function MainView() {
  const [panel, setPanel] = useState<Panel>('none');
  const gardenUnlocked = useStore((s) => s.gardenUnlocked);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);
  const tutorialStage = useStore((s) => s.tutorialStage);

  const openPanel = (next: Panel) => {
    setPanel((current) => (current === next ? 'none' : next));
  };

  const showSanctuaryArrow = tutorialStage === 'showSanctuaryArrow';

  return (
    <div className="main-view">
      <header className="main-topbar">
        <div className="main-topbar-left">
          <h1 className="main-title">Mochi Meadow</h1>
        </div>
        <div className="main-topbar-right">
          <PointsDisplay />
          <div className="main-icon-menu" aria-label="Main menu">
            <button
              className={`main-icon-btn ${panel === 'todo' ? 'active' : ''}`}
              onClick={() => openPanel('todo')}
              aria-label="Open to-do list"
            >
              📝
            </button>
            <button
              className={`main-icon-btn ${panel === 'study' ? 'active' : ''}`}
              onClick={() => openPanel('study')}
              aria-label="Open study timer"
            >
              ⏱
            </button>
            <div className="main-icon-wrapper">
              <button
                className={`main-icon-btn ${panel === 'sanctuary' ? 'active' : ''}`}
                onClick={() => openPanel('sanctuary')}
                aria-label="Open pet egg sanctuary"
              >
                🥚
              </button>
              {showSanctuaryArrow && (
                <div className="main-icon-arrow" aria-hidden>
                  <span className="main-icon-arrow-label">Tap here to visit the egg sanctuary</span>
                </div>
              )}
            </div>
            <button
              className={`main-icon-btn ${panel === 'store' ? 'active' : ''}`}
              onClick={() => openPanel('store')}
              aria-label="Open store"
            >
              🛒
            </button>
            <button
              className="main-icon-btn"
              onClick={() => openPanel('none')}
              aria-label="Settings (coming soon)"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      <section className="main-garden-area">
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
