# Mochi Meadow

A study companion desktop app where **cute mochi pets** grow when you study and complete tasks. You earn points, build them a sanctuary away from the danger, and can only visit the meadow when you’ve put in the work.

---

## Core idea

- **Pets grow** when you study and finish your to-do list.
- **Garden is locked** until you finish today’s study time and/or all tasks — the more you study and complete tasks, the longer you can hang out in the garden and give your pets energy.
- **Pets pop up** on your screen to remind you to study; if you’re not studying, they look **sad** and nudge you to lock in to help their friends revive their friends.
- **Points** from studying and tasks buy food, mist (pet healing), and shelter items.

---

## Features

### Study & focus

- **Study timer** – Set a daily study goal (e.g. 2 hours). Time only counts when you’re in “study mode” or when the app detects focus (e.g. certain apps or manual toggle).
- **Focus / screen awareness** – If the app thinks you’re not studying (idle, wrong app, or study mode off), a **mochi pet overlay** can pop up looking sad to remind you to lock in and focus.
- **Sidebar** – A bar on the side of the screen showing:
  - Study progress (e.g. X minutes left today).
  - Task progress (e.g. 3/5 done).
  - When **both** are done (or you’ve hit the daily goal), the bar can “go off” and you get access to the garden.

### To-do list

- **Tasks** – Add tasks; completing them gives **points** and helps your pets.
- **Points** – Earned from:
  - Studying (e.g. per minute or per session).
  - Completing to-do items.
- **Spending points** – Buy food, mist (healing), and decorations/shelter parts for your pets.

### Garden (locked until you earn it)

- **Access rule** – You can only open or stay in the garden when:
  - You’ve met your study time for the day, **or**
  - You’ve completed all tasks for the day  
  (exact rule is configurable: e.g. “both” or “either”).
- **Inside the garden**:
  - **Pets** – Your mochi pets move around and interact with friends; you can interact (feed, mist, pat).
  - **Shelter / house** – Build or upgrade a little house or shelter; pets can move in and around it.
  - **Mist & healing** – “Lock the garden up” and spray mist to heal/refresh pets only while you are away studying to give them "enery" (uses points or items).
  - **Energy** – Studying and completing tasks “give them energy” so they’re happy and the garden stays available longer (e.g. extended garden time or better mood).

### Pet behavior

- **Pop-ups** – Pets appear on screen (e.g. corner overlay) to:
  - Remind you to study.
  - Remind you about unfinished tasks.
- **Mood** – If you’re not studying when they expect it: they look **sad**; when you’re on track or just finished: they look happy.
- **Growth** – Pets grow or level up over time as you study and complete tasks (visual and maybe small stat changes).

---

## Tech stack (current plan)

- **Electron** – Desktop app (windows, overlay, sidebar, optional screen/focus detection).
- **React + TypeScript + Vite** – UI and state.
- **State** – React context or Zustand for: tasks, study timer, points, pet state, garden lock.

---

## Project structure (scaffold)

```
Mochi-Meadow/
├── electron/           # Main process, windows, overlay
├── src/                # React app
│   ├── components/     # Sidebar, Garden, Todo, PetOverlay, etc.
│   ├── store/          # State (tasks, study, points, pets)
│   ├── types/          # Shared types
│   └── App.tsx
├── package.json
└── README.md
```

---

## How to run (after scaffold)

- `npm install`
- `npm run dev` – Start Electron with Vite dev server.

---

## Roadmap

1. **Phase 1** – Sidebar + study timer + simple to-do list + points; garden locked until “done”.
2. **Phase 2** – Garden view, one pet, simple shelter; feed/mist with points.
3. **Phase 3** – Pet overlay popups, sad/happy states, focus reminders.
4. **Phase 4** – Focus/study detection (optional), polish, more items and pet growth.

You’re in **Mochi Meadow** — study and finish tasks to unlock the garden and keep your mochi pets happy.
