"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LayoutDashboard, PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isPublic = !pathname.startsWith("/dashboard") && !pathname.startsWith("/events");

    // If we are on public pages and not logged in, or purely public home, show public nav
    // But if user is logged in and goes to home, we might want to show dashboard link

    // Actually, easiest is: check if session exists.

    if (!session) {
        return (
            <header className="fixed w-full bg-white/80 backdrop-blur-md border-b z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
                        <Calendar className="w-6 h-6" />
                        <span>ConfManager</span>
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/#features" className="text-slate-600 hover:text-indigo-600 transition hidden md:block">Fonctionnalités</Link>
                        <Link href="/#schedule" className="text-slate-600 hover:text-indigo-600 transition hidden md:block">Programme</Link>
                        <div className="flex items-center gap-4 ml-4">
                            <Link href="/auth/signin" className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition">Connexion</Link>
                            <Link href="/auth/register" className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">Inscription</Link>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }

    // Logged In Navbar (System View)
    return (
        <header className="fixed w-full bg-slate-900 border-b border-slate-700 z-50 text-white shadow-md">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-md text-white">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        <span>ConfManager <span className="text-slate-400 font-normal text-xs uppercase ml-1">System</span></span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        <Link href="/dashboard" className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${pathname === '/dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                            Console
                        </Link>
                        <Link href="/events/my" className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${pathname === '/events/my' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                            Mes Inscriptions
                        </Link>
                        {session?.user?.role === 'ORGANIZER' && (
                            <Link href="/admin/agile-board" className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${pathname === '/admin/agile-board' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                                Suivi Projet (Agile)
                            </Link>
                        )}
                        <Link href="/" className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition">
                            Site Public
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-300 hidden sm:block">{session.user.email}</span>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="p-2 text-slate-400 hover:text-red-400 transition"
                        title="Se déconnecter"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
