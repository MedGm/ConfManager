import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CreateEventForm from "@/components/events/CreateEventForm";
import RegisterButton from "@/components/events/RegisterButton";
import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    const events = await prisma.event.findMany({
        orderBy: { startDate: 'asc' },
        include: {
            _count: {
                select: { registrations: true }
            }
        }
    });

    const userRegistrations = await prisma.registration.findMany({
        where: { userId: parseInt(session.user.id as string) },
        select: { eventId: true }
    });

    const registeredEventIds = new Set(userRegistrations.map((r: any) => r.eventId));
    const isOrganizer = session.user.role === "ORGANIZER";

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header removed, now global */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Vue d'ensemble</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Actions */}
                    <div className="space-y-6">
                        <StatCard
                            title={isOrganizer ? "Total Événements" : "Mes Inscriptions"}
                            value={isOrganizer ? events.length : userRegistrations.length}
                            icon={isOrganizer ? Calendar : Users}
                            variant={isOrganizer ? "indigo" : "emerald"}
                        />


                    </div>

                    {/* Main Content: Events Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">
                                {isOrganizer ? "Gestion des Conférences" : "Conférences Disponibles"}
                            </h2>
                            {isOrganizer && <CreateEventForm />}
                        </div>

                        {events.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
                                <p>Aucune conférence trouvée dans le système.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {events.map((event: any) => (
                                    <div key={event.id} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 relative overflow-hidden">
                                        {/* Decorative Gradient Background */}
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                                        <div className="mb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                                    Conférence
                                                </span>
                                                <span className="flex items-center text-xs text-slate-500 gap-1 bg-slate-100 px-2 py-1 rounded-full">
                                                    <Users className="w-3 h-3" /> {event._count.registrations} inscrits
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center text-sm text-slate-600 gap-2">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                                <span>{new Date(event.startDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-slate-600 gap-2">
                                                <MapPin className="w-4 h-4 text-pink-500" />
                                                <span>{event.location || "En ligne"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            {!isOrganizer ? (
                                                <RegisterButton
                                                    eventId={event.id}
                                                    isRegistered={registeredEventIds.has(event.id)}
                                                />
                                            ) : (
                                                <span className="text-xs font-medium text-slate-400 italic">Vue Organisateur</span>
                                            )}

                                            <Link href={`/events/${event.id}`} className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
                                                Voir Détails →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
