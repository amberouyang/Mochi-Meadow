export type Task = {
  id: string;
  title: string;
  done: boolean;
  points: number;
};

export type Pet = {
  id: string;
  name: string;
  mood: 'happy' | 'sad' | 'neutral';
  energy: number;
  level: number;
};

export type GardenAccess = 'locked' | 'unlocked';

export type ShopItem = {
  id: string;
  name: string;
  cost: number;
  type: 'food' | 'mist' | 'shelter' | 'decoration';
};

export type TutorialStage = 'introMeadow' | 'clearDebris' | 'showSanctuaryArrow' | 'done';

export type GardenDebris = {
  id: string;
  kind: 'rock' | 'tree' | 'rubble';
  cleared: boolean;
};
