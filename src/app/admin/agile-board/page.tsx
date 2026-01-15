"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, User as UserIcon, Calendar, CheckCircle2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TEAM_MEMBERS = [
    "Uthman Junaid",
    "Ahmane Yahya",
    "Essalhi Salma",
    "Kamouss Yassine",
    "El Gorrim Mohamed",
    "Salhi Mohamed",
    "Kchibal Ismail",
    "Mohand Omar Moussa"
];

const COLUMNS = [
    { id: 'TODO', label: 'To Do', color: 'bg-slate-50 border-slate-200' },
    { id: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-50 border-blue-200' },
    { id: 'DONE', label: 'Done', color: 'bg-green-50 border-green-200' }
];

export default function AgileBoardPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New Task Form State
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        assignee: TEAM_MEMBERS[0],
        sprint: 'Sprint 3'
    });

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        } else if (status === "authenticated") {
            if (session?.user?.role !== "ORGANIZER") {
                router.push("/dashboard"); // Redirect non-admins
            } else {
                fetchTasks();
            }
        }
    }, [status, session, router]);

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newTask, status: 'TODO' })
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchTasks();
                setNewTask({
                    title: '',
                    description: '',
                    priority: 'MEDIUM',
                    assignee: TEAM_MEMBERS[0],
                    sprint: 'Sprint 3'
                });
            }
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleUpdateStatus = async (taskId: number, newStatus: string) => {
        // Optimistic update
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

        try {
            await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (error) {
            console.error('Failed to update status', error);
            fetchTasks(); // Revert on error
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
            case 'MEDIUM': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'LOW': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agile Dashboard</h1>
                        <p className="mt-2 text-slate-600">Manage project sprints, track progress, and coordinate team efforts.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-lg shadow-indigo-200"
                    >
                        <Plus className="w-5 h-5" />
                        Create Task
                    </button>
                </div>

                {/* Board Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                    {COLUMNS.map(col => (
                        <div key={col.id} className={`flex flex-col rounded-xl border ${col.color} h-full`}>
                            {/* Column Header */}
                            <div className="p-4 border-b border-black/5 flex justify-between items-center bg-white/50 backdrop-blur-sm rounded-t-xl">
                                <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                                    {col.label}
                                    <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-600">
                                        {tasks.filter(t => t.status === col.id).length}
                                    </span>
                                </h2>
                            </div>

                            {/* Task List */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                                {loading ? (
                                    <div className="animate-pulse space-y-3">
                                        <div className="h-32 bg-slate-200/50 rounded-lg"></div>
                                        <div className="h-32 bg-slate-200/50 rounded-lg"></div>
                                    </div>
                                ) : (
                                    <AnimatePresence>
                                        {tasks.filter(t => t.status === col.id).map(task => (
                                            <motion.div
                                                key={task.id}
                                                layoutId={String(task.id)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="group bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative"
                                            >
                                                {/* Card Header: Sprint & Priority */}
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        {task.sprint}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                                                            {task.priority}
                                                        </span>
                                                        {/* Move Controls (Simple for now, could be drag later) */}
                                                        <div className="hidden group-hover:flex gap-1 absolute top-2 right-2 bg-white shadow-lg p-1 rounded-md border border-slate-100">
                                                            {col.id !== 'TODO' && (
                                                                <button onClick={() => handleUpdateStatus(task.id, 'TODO')} className="p-1 hover:bg-slate-100 rounded" title="Move to TODO">
                                                                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                                                </button>
                                                            )}
                                                            {col.id !== 'IN_PROGRESS' && (
                                                                <button onClick={() => handleUpdateStatus(task.id, 'IN_PROGRESS')} className="p-1 hover:bg-blue-100 rounded" title="Move to In Progress">
                                                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                                </button>
                                                            )}
                                                            {col.id !== 'DONE' && (
                                                                <button onClick={() => handleUpdateStatus(task.id, 'DONE')} className="p-1 hover:bg-green-100 rounded" title="Move to Done">
                                                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="font-semibold text-slate-800 mb-1 leading-snug">{task.title}</h3>
                                                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{task.description}</p>

                                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-medium text-indigo-700">
                                                            {task.assignee?.split(' ').map((n: string) => n[0]).join('')}
                                                        </div>
                                                        <span className="text-xs text-slate-500 truncate max-w-[100px]">{task.assignee}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400">#{task.id}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Task Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 m-auto max-w-lg h-fit bg-white rounded-xl shadow-2xl z-50 p-6"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">Create New Task</h2>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                                        <X className="w-5 h-5 text-slate-500" />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateTask} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                            value={newTask.title}
                                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                            placeholder="e.g. Fix Login Bug"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition h-24 resize-none"
                                            value={newTask.description}
                                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                            placeholder="Details about the task..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                                            <select
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={newTask.priority}
                                                onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                            >
                                                <option value="LOW">Low</option>
                                                <option value="MEDIUM">Medium</option>
                                                <option value="HIGH">High</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Sprint</label>
                                            <select
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={newTask.sprint}
                                                onChange={e => setNewTask({ ...newTask, sprint: e.target.value })}
                                            >
                                                <option value="Backlog">Backlog</option>
                                                <option value="Sprint 1">Sprint 1</option>
                                                <option value="Sprint 2">Sprint 2</option>
                                                <option value="Sprint 3">Sprint 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
                                        <select
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={newTask.assignee}
                                            onChange={e => setNewTask({ ...newTask, assignee: e.target.value })}
                                        >
                                            {TEAM_MEMBERS.map(member => (
                                                <option key={member} value={member}>{member}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="pt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition shadow-md shadow-indigo-200"
                                        >
                                            Create Task
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
