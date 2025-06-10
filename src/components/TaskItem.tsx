'use client';

import { useState, useRef, useEffect } from 'react';
import { Task, Priority } from '@/types/task';
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string, priority: Priority) => void;
}

const priorityColors = {
  low: 'bg-emerald-300/40 dark:bg-emerald-500/30 border-2 border-emerald-400 dark:border-emerald-500',
  medium: 'bg-amber-300/40 dark:bg-amber-500/30 border-2 border-amber-400 dark:border-amber-500',
  high: 'bg-rose-300/40 dark:bg-rose-500/30 border-2 border-rose-400 dark:border-rose-500'
};

const priorityTextColors = {
  low: 'text-emerald-600 dark:text-emerald-400 bg-emerald-200/50 dark:bg-emerald-900/50 border border-emerald-400',
  medium: 'text-amber-600 dark:text-amber-400 bg-amber-200/50 dark:bg-amber-900/50 border border-amber-400',
  high: 'text-rose-600 dark:text-rose-400 bg-rose-200/50 dark:bg-rose-900/50 border border-rose-400'
};

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onUpdate(task.id, editText, editPriority);
      setIsEditing(false);
    }
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all backdrop-blur-sm ${priorityColors[task.priority]}`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.completed && <FaCheck className="text-white text-sm" />}
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-grow flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow bg-transparent border-b-2 border-blue-500 focus:outline-none px-2 py-1"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="bg-transparent border-b-2 border-blue-500 focus:outline-none px-2 py-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </form>
      ) : (
        <div className="flex-grow flex items-center gap-2">
          <p className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.text}
          </p>
          <span className={`text-sm font-medium px-3 py-1 rounded-full shadow-sm ${priorityTextColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => {
            setEditText(task.text);
            setEditPriority(task.priority);
            setIsEditing(true);
          }}
          className="text-blue-500 hover:text-blue-600 p-1"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-600 p-1"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
} 