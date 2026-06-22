import { useMemo, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { Badge } from '$/common/components/badge';
import { Button } from '$/common/components/button';
import { Card } from '$/common/components/card';
import { EmptyState } from '$/common/components/empty-state';
import { Input } from '$/common/components/input';
import { Select } from '$/common/components/select';
import { TaskItem } from './task-item';
import { useTasks } from './use-tasks';
import type { Filter, Priority } from './types';

const FILTERS: Filter[] = ['all', 'active', 'completed'];

export const TaskBoard = () => {
  // All the task logic lives in our custom hook.
  const { tasks, addTask, toggleTask, removeTask, clearCompleted } = useTasks();

  // Local UI state for the form + the active filter.
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [filter, setFilter] = useState<Filter>('all');

  // REVISION NOTE — derived state with useMemo:
  // We don't store the filtered list in state — we COMPUTE it from tasks + filter.
  // useMemo just avoids recomputing it unless those inputs change.
  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const remaining = tasks.filter((t) => !t.completed).length;
  const hasCompleted = tasks.some((t) => t.completed);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title, priority);
    setTitle(''); // reset the form after adding
    setPriority('medium');
  };

  return (
    <Card className="flex w-full max-w-xl flex-col gap-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📋 Task Board</h1>
        <Badge variant={remaining === 0 ? 'success' : 'info'}>
          {remaining} {remaining === 1 ? 'task' : 'tasks'} left
        </Badge>
      </header>

      {/* Controlled form: every field's value is driven by state */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Input
          label="New task"
          placeholder="What needs doing?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Select
          label="Priority"
          value={priority}
          // The native value is a string, so we narrow it back to Priority.
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Button type="submit" disabled={!title.trim()}>
          Add
        </Button>
      </form>

      {/* Filter buttons — the active one is highlighted */}
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'ghost'}
            size="small"
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* REVISION NOTE — lists & keys, and empty states:
          Every item in a mapped list needs a stable, unique `key`. */}
      {visibleTasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Nothing here yet"
          description={filter === 'all' ? 'Add your first task above. 🚀' : `No ${filter} tasks.`}
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} />
          ))}
        </ul>
      )}

      {hasCompleted && (
        <Button variant="ghost" size="small" onClick={clearCompleted} className="self-end">
          Clear completed
        </Button>
      )}
    </Card>
  );
};
