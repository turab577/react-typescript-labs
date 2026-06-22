import { useEffect, useState } from 'react';
import type { Priority, Task } from './types';

// REVISION NOTE — custom hooks:
// A custom hook is just a function whose name starts with "use" and that calls
// other hooks. It lets us bundle all the task state + logic in one place and
// reuse it from any component. The component using it stays clean.

const STORAGE_KEY = 'task-board:tasks';

// Lazy initializer: read from localStorage ONCE on first render (not every render).
function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  // Passing a function to useState makes it a "lazy" initial value —
  // loadTasks() runs only on the first render.
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  // REVISION NOTE — useEffect for side effects:
  // Whenever `tasks` changes, persist them. The [tasks] dependency array means
  // "re-run this only when tasks changes". That's how the list survives refreshes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Priority) => {
    const trimmed = title.trim();
    if (!trimmed) return; // ignore empty input

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    // Immutable update: build a NEW array instead of mutating the old one.
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return { tasks, addTask, toggleTask, removeTask, clearCompleted };
}
