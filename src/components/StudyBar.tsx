import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import './StudyBar.css';

export function StudyBar() {
  const studyMinutesGoal = useStore((s) => s.studyMinutesGoal);
  const studyMinutesToday = useStore((s) => s.studyMinutesToday);
  const studyState = useStore((s) => s.studyState);
  const setStudyMinutesGoal = useStore((s) => s.setStudyMinutesGoal);
  const addStudyMinute = useStore((s) => s.addStudyMinute);
  const setStudyState = useStore((s) => s.setStudyState);
  const addPoints = useStore((s) => s.addPoints);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);

  const [secondsThisSession, setSecondsThisSession] = useState(0);

  useEffect(() => {
    if (studyState !== 'studying') return;
    const interval = setInterval(() => {
      setSecondsThisSession((s) => {
        const next = s + 1;
        if (next >= 60) {
          addStudyMinute();
          addPoints(5);
          checkGardenAccess();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [studyState, addStudyMinute, addPoints, checkGardenAccess]);

  const progress = Math.min(100, (studyMinutesToday / studyMinutesGoal) * 100);

  return (
    <div className="study-bar">
      <p className="study-hint">
        Start the timer when you study. Meet your goal to unlock the garden and give your pets
        energy.
      </p>
      <div className="study-goal">
        <label>Daily goal (minutes)</label>
        <input
          type="number"
          min={1}
          value={studyMinutesGoal}
          onChange={(e) => setStudyMinutesGoal(Number(e.target.value) || 60)}
        />
      </div>
      <div className="study-timer">
        <div className="study-time">
          <span className="study-minutes">{studyMinutesToday}</span>
          <span className="study-sep">/</span>
          <span>{studyMinutesGoal} min</span>
        </div>
        <div className="study-session">
          This session: {studyState === 'studying' ? `${secondsThisSession}s` : '—'}
        </div>
        <button
          className={`study-toggle ${studyState === 'studying' ? 'studying' : ''}`}
          onClick={() => setStudyState(studyState === 'studying' ? 'idle' : 'studying')}
        >
          {studyState === 'studying' ? 'Stop' : 'Start studying'}
        </button>
      </div>
      <div className="study-progress-wrap">
        <div className="study-progress-bar" style={{ width: `${progress}%` }} />
        <span className="study-progress-label">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
