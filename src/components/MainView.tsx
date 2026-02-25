import { useState } from 'react';
import { useStore } from '../store/useStore';
import { TodoList } from './TodoList';
import { StudyBar } from './StudyBar';
import { Garden } from './Garden';
import { PointsDisplay } from './PointsDisplay';
import './MainView.css';

export function MainView() {
  const [tab, setTab] = useState<'todo' | 'study' | 'garden'>('todo');
  const gardenUnlocked = useStore((s) => s.gardenUnlocked);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);

  const openGarden = () => {
    checkGardenAccess();
    setTab('garden');
  };

  return (
    <div className="main-view">
      <header className="main-header">
        <h1>Mochi Meadow</h1>
        <PointsDisplay />
      </header>

      <nav className="main-tabs">
        <button className={tab === 'todo' ? 'active' : ''} onClick={() => setTab('todo')}>
          To-do
        </button>
        <button className={tab === 'study' ? 'active' : ''} onClick={() => setTab('study')}>
          Study
        </button>
        <button
          className={tab === 'garden' ? 'active' : ''}
          onClick={openGarden}
          data-locked={!gardenUnlocked}
        >
          Garden {!gardenUnlocked && '🔒'}
        </button>
      </nav>

      <main className="main-content">
        {tab === 'todo' && <TodoList />}
        {tab === 'study' && <StudyBar />}
        {tab === 'garden' && (
          <Garden locked={!gardenUnlocked} onUnlockHint={checkGardenAccess} />
        )}
      </main>
    </div>
  );
}
