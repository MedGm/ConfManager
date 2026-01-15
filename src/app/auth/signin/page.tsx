"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Calendar, ArrowRight } from "lucide-react";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Email ou mot de passe incorrect.");
            setLoading(false);
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Hero / Branding */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center text-white p-12">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-3 text-3xl font-bold mb-6">
                        <Calendar className="w-10 h-10" />
                        ConfManager
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">Gérez vos conférences avec excellence.</h1>
                    <p className="text-indigo-100 text-lg">
                        La plateforme tout-en-un pour les organisateurs et les participants.
                        Planification, Inscriptions, et gestion d'agenda simplifiées.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10 lg:text-left">
                        <Link href="/" className="lg:hidden inline-flex items-center gap-2 font-bold text-xl text-indigo-600 mb-8">
                            <Calendar className="w-6 h-6" /> ConfManager
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Bon retour</h2>
                        <p className="text-slate-500">Connectez-vous pour accéder à votre espace.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Professionnel</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                                required
                                placeholder="nom@organisation.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Se connecter"} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Pas encore de compte ? {" "}
                        <Link href="/auth/register" className="text-indigo-600 font-semibold hover:underline">
                            Créer un compte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
