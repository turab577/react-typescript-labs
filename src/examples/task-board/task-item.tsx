import { Trash2 } from 'lucide-react';
import { Badge } from '$/common/components/badge';
import { Button } from '$/common/components/button';
import { Checkbox } from '$/common/components/checkbox';
import { cn } from '$/common/utilities/cn';
import type { Priority, Task } from './types';

// REVISION NOTE — mapping data to UI:
// We turn a priority value into a Badge color via a lookup object.
// `Record<Priority, ...>` forces us to handle every priority — if you add a new
// one to the Priority type, TypeScript will error here until you map it.
const priorityVariant: Record<Priority, 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};

// REVISION NOTE — typing props + callbacks:
// The parent owns the data, so this child just receives the task plus
// callbacks to ask the parent to change it. This is "lifting state up".
type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export const TaskItem = ({ task, onToggle, onRemove }: TaskItemProps) => {
  return (
    <li className="flex items-center gap-3 rounded border border-slate-200 px-3 py-2 dark:border-slate-700">
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        label={task.title}
        hideLabel
      />

      {/* Strike through + dim the text when completed (conditional classes) */}
      <span className={cn('flex-1', task.completed && 'text-slate-400 line-through')}>
        {task.title}
      </span>

      <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>

      <Button
        variant="ghost"
        size="small"
        onClick={() => onRemove(task.id)}
        aria-label={`Delete "${task.title}"`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
};
