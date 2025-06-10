'use client';

import { TaskProvider } from '@/context/TaskContext';
import AddTask from '@/components/AddTask';
import TaskList from '@/components/TaskList';
import TaskStats from '@/components/TaskStats';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Task Manager
          </h1>
          <TaskStats />
          <AddTask />
          <TaskList />
          <ThemeToggle />
        </div>
      </main>
    </TaskProvider>
  );
} 