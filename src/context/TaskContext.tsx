'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, Priority } from '@/types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, priority: Priority) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, text: string, priority: Priority) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, priority: Priority) => {
    setTasks(prev => [
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
        priority
      },
      ...prev
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: string, text: string, priority: Priority) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, text, priority } : task))
    );
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
        reorderTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
} 