import { useMemo, useState, useCallback } from 'react';
import { MainView } from './components/MainView';
import { SidebarView } from './components/SidebarView';
import { OverlayView } from './components/OverlayView';
import { IntroScreen } from './components/IntroScreen';
import { useStore } from './store/useStore';
import './App.css';

function getRoute() {
  const hash = window.location.hash.slice(1) || 'main';
  if (hash === 'sidebar') return 'sidebar';
  if (hash === 'overlay') return 'overlay';
  return 'main';
}

export default function App() {
  const route = useMemo(() => getRoute(), [window.location.hash]);
  const [showIntro, setShowIntro] = useState(true);
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const unlockGarden = useStore((s) => s.unlockGarden);
  const claimWelcomeBonus = useStore((s) => s.claimWelcomeBonus);

  const onIntroComplete = useCallback(() => {
    setShowIntro(false);
    unlockGarden();
    setShowBonusPopup(true);
  }, [unlockGarden]);

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
      {showBonusPopup && (
        <div className="bonus-popup-overlay">
          <div className="bonus-popup">
            <p className="bonus-popup-text">Here is 50 points to get you started!</p>
            <button type="button" className="bonus-popup-btn" onClick={onCollectBonus}>
              Collect
            </button>
          </div>
        </div>
      )}
    </>
  );
}
