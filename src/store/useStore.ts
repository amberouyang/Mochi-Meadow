import { create } from 'zustand';
import type { Task, Pet } from '../types';

type StudyState = 'idle' | 'studying';

type Store = {
  // Study
  studyMinutesGoal: number;
  studyMinutesToday: number;
  studyState: StudyState;
  setStudyMinutesGoal: (n: number) => void;
  setStudyMinutesToday: (n: number) => void;
  addStudyMinute: () => void;
  setStudyState: (s: StudyState) => void;

  // Tasks
  tasks: Task[];
  addTask: (title: string, points?: number) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;

  // Points
  points: number;
  addPoints: (n: number) => void;
  spendPoints: (n: number) => boolean;

  // Pets
  pets: Pet[];
  setPetMood: (id: string, mood: Pet['mood']) => void;
  feedPet: (id: string) => void;

  // Garden
  gardenUnlocked: boolean;
  unlockGarden: () => void;
  lockGarden: () => void;
  checkGardenAccess: () => void;
};

export const useStore = create<Store>((set, get) => ({
  studyMinutesGoal: 60,
  studyMinutesToday: 0,
  studyState: 'idle',
  setStudyMinutesGoal: (n) => set({ studyMinutesGoal: Math.max(0, n) }),
  setStudyMinutesToday: (n) => set({ studyMinutesToday: Math.max(0, n) }),
  addStudyMinute: () => set((s) => ({ studyMinutesToday: s.studyMinutesToday + 1 })),
  setStudyState: (s) => set({ studyState: s }),

  tasks: [
    { id: '1', title: 'Finish math homework', done: false, points: 10 },
    { id: '2', title: 'Read chapter 3', done: false, points: 15 },
  ],
  addTask: (title, points = 5) =>
    set((s) => ({
      tasks: [...s.tasks, { id: crypto.randomUUID(), title, done: false, points }],
    })),
  toggleTask: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),
  removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  points: 0,
  addPoints: (n) => set((s) => ({ points: s.points + n })),
  spendPoints: (n) => {
    const { points } = get();
    if (points < n) return false;
    set((s) => ({ points: s.points - n }));
    return true;
  },

  pets: [{ id: 'm1', name: 'Mochi', mood: 'neutral', energy: 50, level: 1 }],
  setPetMood: (id, mood) =>
    set((s) => ({
      pets: s.pets.map((p) => (p.id === id ? { ...p, mood } : p)),
    })),
  feedPet: (id) =>
    set((s) => ({
      pets: s.pets.map((p) => (p.id === id ? { ...p, energy: Math.min(100, p.energy + 20) } : p)),
    })),

  gardenUnlocked: false,
  unlockGarden: () => set({ gardenUnlocked: true }),
  lockGarden: () => set({ gardenUnlocked: false }),
  checkGardenAccess: () => {
    const { tasks, studyMinutesToday, studyMinutesGoal } = get();
    const allDone = tasks.every((t) => t.done);
    const studyDone = studyMinutesToday >= studyMinutesGoal;
    set({ gardenUnlocked: allDone || studyDone });
  },
}));
