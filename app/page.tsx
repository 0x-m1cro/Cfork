"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchHealth();
    fetchTasks();
  }, []);

  const fetchHealth = async () => {
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setHealth(data);
    } catch (err) {
      console.error("Failed to fetch health:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error("Failed to create task");
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Cline - Full-Stack Next.js App
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Migrated with Next.js 14+ App Router Architecture
          </p>
          {health && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-800 dark:text-green-200">
                API Status: {health.status} | Version: {health.version}
              </span>
            </div>
          )}
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Task Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Create New Task
            </h2>
            <form onSubmit={createTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Create Task
              </button>
            </form>
          </div>

          {/* Tasks List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Tasks
            </h2>
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : error ? (
              <p className="text-red-600 dark:text-red-400">{error}</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No tasks yet. Create one to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {task.title}
                      </h3>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {task.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {task.status}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* API Documentation Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            API Endpoints
          </h2>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <code className="text-green-600 dark:text-green-400 font-mono">
                GET /api/health
              </code>
              <span className="text-gray-600 dark:text-gray-400 md:col-span-2">
                Check API health status
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <code className="text-green-600 dark:text-green-400 font-mono">
                GET /api/tasks
              </code>
              <span className="text-gray-600 dark:text-gray-400 md:col-span-2">
                Fetch all tasks
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <code className="text-blue-600 dark:text-blue-400 font-mono">
                POST /api/tasks
              </code>
              <span className="text-gray-600 dark:text-gray-400 md:col-span-2">
                Create a new task
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <code className="text-red-600 dark:text-red-400 font-mono">
                DELETE /api/tasks?id=:id
              </code>
              <span className="text-gray-600 dark:text-gray-400 md:col-span-2">
                Delete a task
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-2">
              <code className="text-green-600 dark:text-green-400 font-mono">
                GET /api/settings
              </code>
              <span className="text-gray-600 dark:text-gray-400 md:col-span-2">
                Fetch application settings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
