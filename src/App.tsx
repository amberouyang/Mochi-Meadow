import { useMemo, useState, useCallback } from 'react';
import { MainView } from './components/MainView';
import { SidebarView } from './components/SidebarView';
import { OverlayView } from './components/OverlayView';
import { IntroScreen } from './components/IntroScreen';

function getRoute() {
  const hash = window.location.hash.slice(1) || 'main';
  if (hash === 'sidebar') return 'sidebar';
  if (hash === 'overlay') return 'overlay';
  return 'main';
}

export default function App() {
  const route = useMemo(() => getRoute(), [window.location.hash]);
  const [showIntro, setShowIntro] = useState(true);
  const onIntroComplete = useCallback(() => setShowIntro(false), []);

  if (route === 'sidebar') return <SidebarView />;
  if (route === 'overlay') return <OverlayView />;

  return (
    <>
      <MainView />
      {showIntro && (
        <IntroScreen onComplete={onIntroComplete} durationMs={5000} fadeMs={1200} />
      )}
    </>
  );
}
