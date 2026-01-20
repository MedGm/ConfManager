"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Clock, User, Type } from "lucide-react";

export default function CreateSessionForm({ eventId }: { eventId: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            speaker: formData.get("speaker"),
            startTime: formData.get("startTime"),
            endTime: formData.get("endTime"),
            eventId: eventId,
        };

        try {
            const res = await fetch("/api/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Impossible de créer la session.");
            }

            router.refresh();
            setIsOpen(false);
            // Reset form if needed, or just close
        } catch (err) {
            setError("Erreur lors de la création.");
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" /> Ajouter une session au planning
            </button>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 text-lg">Nouvelle Session</h3>
                <button onClick={() => setIsOpen(false)} className="text-sm text-slate-500 hover:text-slate-800">Fermer</button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Titre de la session</label>
                    <div className="relative">
                        <Type className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                        <input
                            id="title"
                            name="title"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Keynote d'ouverture"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="speaker" className="block text-sm font-medium text-slate-700 mb-1">Speaker / Intervenant</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                        <input
                            id="speaker"
                            name="speaker"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Dr. Alan Turing"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">Début</label>
                        <input id="startTime" name="startTime" type="datetime-local" required className="w-full p-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">Fin</label>
                        <input id="endTime" name="endTime" type="datetime-local" required className="w-full p-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ajouter au planning"}
                    </button>
                </div>
            </form>
        </div>
    );
}
