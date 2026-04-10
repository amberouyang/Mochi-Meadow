import { useMemo, useState, useCallback } from 'react';
import { MainView } from './components/MainView';
import { SidebarView } from './components/SidebarView';
import { OverlayView } from './components/OverlayView';
import { IntroScreen } from './components/IntroScreen';
import { useStore } from './store/useStore';
import './App.css';

function getRoute() {
  const raw = window.location.hash.slice(1) || 'main';
  const hash = raw.replace(/^\//, '');
  if (hash === 'sidebar') return 'sidebar';
  if (hash === 'overlay') return 'overlay';
  return 'main';
}

export default function App() {
  const route = useMemo(() => getRoute(), [window.location.hash]);
  const [showIntro, setShowIntro] = useState(true);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const unlockGarden = useStore((s) => s.unlockGarden);
  const claimWelcomeBonus = useStore((s) => s.claimWelcomeBonus);
  const setPlayerName = useStore((s) => s.setPlayerName);
  const playerName = useStore((s) => s.playerName);

  const onIntroComplete = useCallback(() => {
    setShowIntro(false);
    unlockGarden();
    setShowNamePopup(true);
  }, [unlockGarden]);

  const [pendingName, setPendingName] = useState('');
  const onConfirmName = useCallback(() => {
    const name = pendingName.trim();
    if (!name) return;
    setPlayerName(name);
    setShowNamePopup(false);
    setShowBonusPopup(true);
  }, [pendingName, setPlayerName]);

  const onCollectBonus = useCallback(() => {
    claimWelcomeBonus();
    setShowBonusPopup(false);
  }, [claimWelcomeBonus]);

  if (route === 'sidebar') return <SidebarView />;
  if (route === 'overlay') return <OverlayView />;

  return (
    <>
      <MainView />
      {showIntro && <IntroScreen onComplete={onIntroComplete} />}
      {showNamePopup && (
        <div className="bonus-popup-overlay">
          <div className="bonus-popup">
            <p className="bonus-popup-text">What’s your name?</p>
            <input
              className="name-popup-input"
              value={pendingName}
              onChange={(e) => setPendingName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && onConfirmName()}
            />
            <button
              type="button"
              className="bonus-popup-btn"
              onClick={onConfirmName}
              disabled={!pendingName.trim()}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {showBonusPopup && (
        <div className="bonus-popup-overlay">
          <div className="bonus-popup">
            <p className="bonus-popup-text">
              Welcome {playerName || 'friend'}! Here is 50 points to get you started!
            </p>
            <button type="button" className="bonus-popup-btn" onClick={onCollectBonus}>
              Collect
            </button>
          </div>
        </div>
      )}
    </>
  );
}
