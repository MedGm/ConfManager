"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

export default function RegisterButton({ eventId, isRegistered }: { eventId: number, isRegistered: boolean }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(isRegistered);

    async function handleRegister() {
        if (registered) return;

        setLoading(true);
        try {
            const res = await fetch("/api/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId }),
            });

            if (!res.ok) throw new Error("Failed");

            setRegistered(true);
            router.refresh();
        } catch (err) {
            alert("Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    }

    if (registered) {
        return (
            <button disabled className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-lg flex items-center gap-2 cursor-default">
                <Check className="w-4 h-4" /> Inscrit
            </button>
        );
    }

    return (
        <button
            onClick={handleRegister}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "S'inscrire"}
        </button>
    );
}
