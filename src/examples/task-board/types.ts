// Shared types for the Task Board example.

// A union type — `priority` can only ever be one of these three strings.
export type Priority = 'low' | 'medium' | 'high';

// Which tasks are currently shown.
export type Filter = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}
