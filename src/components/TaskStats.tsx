'use client';

import { useTaskContext } from '@/context/TaskContext';

export default function TaskStats() {
  const { tasks } = useTaskContext();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h3>
        <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
        <p className="text-2xl font-bold text-yellow-500">{pendingTasks}</p>
      </div>
    </div>
  );
} 