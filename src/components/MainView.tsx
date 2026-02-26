import { useState } from 'react';
import { useStore } from '../store/useStore';
import { TodoList } from './TodoList';
import { StudyBar } from './StudyBar';
import { Garden } from './Garden';
import { PointsDisplay } from './PointsDisplay';
import './MainView.css';

export function MainView() {
  const [sidebarTab, setSidebarTab] = useState<'todo' | 'study'>('todo');
  const gardenUnlocked = useStore((s) => s.gardenUnlocked);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);

  return (
    <div className="main-view">
      {/* Main area: cute garden first */}
      <section className="main-garden-area">
        <Garden locked={!gardenUnlocked} onUnlockHint={checkGardenAccess} />
      </section>

      {/* Sidebar: todo, study, points */}
      <aside className="main-sidebar">
        <div className="main-sidebar-header">
          <h2 className="main-sidebar-title">Mochi Meadow</h2>
          <PointsDisplay />
        </div>
        <nav className="main-sidebar-tabs">
          <button
            className={sidebarTab === 'todo' ? 'active' : ''}
            onClick={() => setSidebarTab('todo')}
          >
            To-do
          </button>
          <button
            className={sidebarTab === 'study' ? 'active' : ''}
            onClick={() => setSidebarTab('study')}
          >
            Study
          </button>
        </nav>
        <div className="main-sidebar-content">
          {sidebarTab === 'todo' && <TodoList />}
          {sidebarTab === 'study' && <StudyBar />}
        </div>
        {!gardenUnlocked && (
          <p className="main-sidebar-hint">
            Finish tasks or meet your study goal to unlock the garden 🌱
          </p>
        )}
      </aside>
    </div>
  );
}
