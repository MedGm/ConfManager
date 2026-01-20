import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import CreateSessionForm from "@/components/events/CreateSessionForm";
import RegisterButton from "@/components/events/RegisterButton";
import Navbar from "@/components/layout/Navbar";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    const event = await prisma.event.findUnique({
        where: { id: Number.parseInt(resolvedParams.id) },
        include: {
            organizer: true,
            sessions: {
                orderBy: { startTime: 'asc' }
            },
            registrations: true
        }
    });

    if (!event) return notFound();

    const isOrganizer = session?.user?.role === 'ORGANIZER' || session?.user?.email === event.organizer.email;
    const isRegistered = session && event.registrations.some((r: any) => r.userId === Number.parseInt(session.user.id as string));

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Note: Navbar is Global in Layout, but we can have specific actions here if needed */}

            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600 opacity-20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </Link>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{event.title}</h1>

                        <div className="flex flex-wrap gap-6 text-slate-300 text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-indigo-400" />
                                <span>{new Date(event.startDate).toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-400" />
                                <span>{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-400" />
                                <span>{event.location || "En ligne"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">À propos de l'événement</h2>
                            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                                {event.description}
                            </p>
                        </section>

                        {/* Programme */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Programme</h2>
                                {isOrganizer && (
                                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Mode Édition</span>
                                )}
                            </div>

                            <div className="space-y-4">
                                {event.sessions.length === 0 ? (
                                    <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
                                        Le programme n'a pas encore été annoncé.
                                    </div>
                                ) : (
                                    event.sessions.map((session: any) => (
                                        <div key={session.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-6">
                                            <div className="flex-shrink-0 w-32 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 sm:pr-6 flex flex-col justify-center">
                                                <span className="text-indigo-600 font-bold block text-lg">
                                                    {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="text-slate-400 text-sm block">
                                                    - {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">{session.title}</h3>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <User className="w-4 h-4 text-indigo-500" />
                                                    <span className="font-medium">{session.speaker}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Organizer Action: Add Session */}
                            {isOrganizer && (
                                <div className="mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Ajouter une session</h3>
                                    <CreateSessionForm eventId={event.id} />
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Registration Card */}
                        {/* Registration Card - Only for Non-Organizers */}
                        {!isOrganizer && (
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 sticky top-24">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Inscription</h3>
                                <p className="text-slate-500 text-sm mb-6">Réservez votre place dès maintenant pour participer.</p>

                                <div className="mb-6 flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Participant(s)</span>
                                    <span className="font-bold text-slate-900">{event.registrations.length} Inscrits</span>
                                </div>

                                {session ? (
                                    <div className="w-full">
                                        <RegisterButton eventId={event.id} isRegistered={!!isRegistered} />
                                    </div>
                                ) : (
                                    <Link href="/auth/signin" className="block w-full py-3 bg-indigo-600 text-white text-center font-bold rounded-xl hover:bg-indigo-700 transition">
                                        Se connecter pour s'inscrire
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Organizer Info */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Organisateur</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                    {event.organizer.name?.[0] || "O"}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{event.organizer.name}</div>
                                    <div className="text-xs text-slate-500">{event.organizer.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
