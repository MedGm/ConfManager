"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar as CalIcon, MapPin, Type, AlignLeft, Info, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateEventForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            location: formData.get("location"),
        };

        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to create event");
            }

            router.refresh();
            setIsOpen(false);
        } catch (err) {
            setError("Erreur lors de la création de l'événement.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-indigo-200"
            >
                <Plus className="w-4 h-4" />
                Nouvelle Conférence
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 m-auto max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50 p-0"
                        >
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-inherit z-10">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <CalIcon className="w-5 h-5 text-indigo-600" />
                                    Nouvelle Conférence
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100">
                                        <Info className="w-4 h-4" /> {error}
                                    </div>
                                )}

                                {/* Inputs */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Titre <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Type className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                            <input
                                                name="title"
                                                required
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                                placeholder="ex: Conférence IA 2026"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition h-24 resize-none"
                                            placeholder="Thèmes, objectifs..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Début <span className="text-red-500">*</span></label>
                                            <input name="startDate" type="datetime-local" required className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Fin <span className="text-red-500">*</span></label>
                                            <input name="endDate" type="datetime-local" required className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Lieu</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                            <input
                                                name="location"
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                                placeholder="ex: Salle B, Zoom..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition">Annuler</button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50 shadow-md shadow-indigo-200"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
