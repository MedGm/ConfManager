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
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-slate-50 border-b border-slate-200 uppercase text-xs font-semibold text-slate-500">
                                        <tr>
                                            <th className="px-6 py-4">Conférence</th>
                                            <th className="px-6 py-4">Date & Lieu</th>
                                            <th className="px-6 py-4 text-center">Inscrits</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {events.map((event: any) => (
                                            <tr key={event.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-slate-900">{event.title}</div>
                                                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{event.description}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-indigo-500" />
                                                        <span>{new Date(event.startDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <MapPin className="w-4 h-4 text-slate-400" />
                                                        <span>{event.location || "En ligne"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {event._count.registrations}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    {!isOrganizer && (
                                                        <div className="inline-block">
                                                            <RegisterButton
                                                                eventId={event.id}
                                                                isRegistered={registeredEventIds.has(event.id)}
                                                            />
                                                        </div>
                                                    )}
                                                    <Link href={`/events/${event.id}`} className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition">
                                                        Détails
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
