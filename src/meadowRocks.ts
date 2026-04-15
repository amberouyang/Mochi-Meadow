import rock1 from './assets/debris-rocks/Rock1.png';
import rock2 from './assets/debris-rocks/Rock2.png';
import rock3 from './assets/debris-rocks/Rock3.png';
import rock4 from './assets/debris-rocks/Rock4.png';
import rock5 from './assets/debris-rocks/Rock5.png';

/** All rock sprites (PNG — use alpha in source for transparency). */
export const ROCK_ASSETS = [rock1, rock2, rock3, rock4, rock5] as const;

/**
 * All five rocks stacked into one tutorial “rubble” pile (% of pile box width / height).
 */
export const RUBBLE_PILE_LAYERS = [
  { assetIndex: 0, leftPct: 4, bottomPct: 0, widthPct: 46, rotDeg: -13, z: 1 },
  { assetIndex: 1, leftPct: 48, bottomPct: 2, widthPct: 42, rotDeg: 11, z: 2 },
  { assetIndex: 4, leftPct: 26, bottomPct: 6, widthPct: 44, rotDeg: 5, z: 3 },
  { assetIndex: 2, leftPct: 18, bottomPct: 20, widthPct: 52, rotDeg: -5, z: 4 },
  { assetIndex: 3, leftPct: 50, bottomPct: 24, widthPct: 40, rotDeg: 14, z: 5 },
] as const;

/** Pixel width for every centered decorative rock (same size). */
export const MEADOW_CENTER_ROCK_SIZE_PX = 110;

/**
 * Five rocks fixed to the meadow panel (not the panning art): one of each sprite,
 * spread through the center. Positions are % of `.garden-meadow-bg`.
 */
export const MEADOW_CENTER_ROCKS_LAYOUT = [
  { leftPct: 36, bottomPct: 46, rotDeg: -7, assetIndex: 0 },
  { leftPct: 50, bottomPct: 50, rotDeg: 5, assetIndex: 1 },
  { leftPct: 62, bottomPct: 44, rotDeg: -3, assetIndex: 2 },
  { leftPct: 44, bottomPct: 36, rotDeg: 9, assetIndex: 3 },
  { leftPct: 56, bottomPct: 38, rotDeg: -6, assetIndex: 4 },
] as const;
