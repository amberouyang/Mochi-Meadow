import { useState } from 'react';
import { useStore } from '../store/useStore';
import './TodoList.css';

export function TodoList() {
  const tasks = useStore((s) => s.tasks);
  const addTask = useStore((s) => s.addTask);
  const toggleTask = useStore((s) => s.toggleTask);
  const removeTask = useStore((s) => s.removeTask);
  const addPoints = useStore((s) => s.addPoints);
  const checkGardenAccess = useStore((s) => s.checkGardenAccess);

  const [input, setInput] = useState('');

  const handleAdd = () => {
    const t = input.trim();
    if (!t) return;
    addTask(t);
    setInput('');
  };

  const handleToggle = (id: string, done: boolean, points: number) => {
    toggleTask(id);
    if (!done) {
      addPoints(points);
      checkGardenAccess();
    }
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="todo-list">
      <p className="todo-hint">Complete tasks to earn points and unlock the garden.</p>
      <div className="todo-add">
        <input
          type="text"
          placeholder="New task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="todo-items">
        {tasks.map((t) => (
          <li key={t.id} className="todo-item" data-done={t.done}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => handleToggle(t.id, t.done, t.points)}
              />
              <span className="todo-title">{t.title}</span>
              <span className="todo-points">+{t.points} pts</span>
            </label>
            <button className="todo-remove" onClick={() => removeTask(t.id)} aria-label="Remove">
              ×
            </button>
          </li>
        ))}
      </ul>
      <p className="todo-progress">
        {doneCount} / {tasks.length} tasks done
      </p>
    </div>
  );
}
