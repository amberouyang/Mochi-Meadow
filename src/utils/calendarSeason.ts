/** Northern-hemisphere calendar seasons for meadow UI tints. Winter months map to spring palette. */
export type CalendarSeason = 'spring' | 'summer' | 'autumn';

export function getCalendarSeason(date = new Date()): CalendarSeason {
  const m = date.getMonth(); // 0–11
  if (m >= 2 && m <= 4) return 'spring'; // Mar–May
  if (m >= 5 && m <= 7) return 'summer'; // Jun–Aug
  if (m >= 8 && m <= 10) return 'autumn'; // Sep–Nov
  return 'spring'; // Dec–Feb: cool months use spring base (add winter later if needed)
}
