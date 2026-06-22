import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskBoard } from './task-board';

import '$/common/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element. 😵‍💫');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <div className="flex min-h-screen items-start justify-center p-8">
      <TaskBoard />
    </div>
  </React.StrictMode>,
);
