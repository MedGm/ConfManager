"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar as CalIcon, MapPin, Type, AlignLeft, Info } from "lucide-react";

export default function CreateEventForm() {
    const router = useRouter();
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
            router.push("/dashboard");
        } catch (err) {
            setError("Erreur lors de la création de l'événement.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <CalIcon className="w-5 h-5 text-indigo-600" />
                    Nouvelle Conférence
                </h2>
                <p className="text-xs text-slate-500 mt-1">Veuillez remplir les informations requises pour initialiser l'espace de conférence.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100">
                        <Info className="w-4 h-4" /> {error}
                    </div>
                )}

                {/* Section 1: Informations Générales */}
                <fieldset className="space-y-4">
                    <legend className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2 border-b border-slate-100 w-full pb-2">
                        1. Informations Générales
                    </legend>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la Conférence <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Type className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                            <input
                                name="title"
                                required
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="ex: International Conference on AI 2026"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Le titre officiel qui apparaîtra sur la page publique.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description / Thématique</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <textarea
                                name="description"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                rows={3}
                                placeholder="Décrivez les objectifs et les thèmes abordés..."
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Section 2: Logistique */}
                <fieldset className="space-y-4">
                    <legend className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2 border-b border-slate-100 w-full pb-2">
                        2. Logistique & Planification
                    </legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date de début <span className="text-red-500">*</span></label>
                            <input
                                name="startDate"
                                type="datetime-local"
                                required
                                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date de fin <span className="text-red-500">*</span></label>
                            <input
                                name="endDate"
                                type="datetime-local"
                                required
                                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Lieu / Salle</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                            <input
                                name="location"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="ex: Palais des Congrès, Salle B ou Lien Zoom"
                            />
                        </div>
                    </div>
                </fieldset>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" onClick={() => router.back()} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition">Annuler</button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50 shadow-md shadow-indigo-200"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initialiser la Conférence"}
                    </button>
                </div>
            </form>
        </div>
    );
}
