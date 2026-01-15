import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default async function MyRegistrationsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    const registrations = await prisma.registration.findMany({
        where: { userId: parseInt(session.user.id as string) },
        include: {
            event: true
        }
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Mes Inscriptions</h1>
                    <p className="text-slate-500">Gérez vos participations aux conférences.</p>
                </div>

                {registrations.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
                        <p>Vous n'êtes inscrit à aucun événement.</p>
                        <Link href="/dashboard" className="text-indigo-600 font-medium hover:underline mt-2 inline-block">
                            Parcourir les événements
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 border-b border-slate-200 uppercase text-xs font-semibold text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Conférence</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {registrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-slate-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{reg.event.title}</div>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                <MapPin className="w-3 h-3" /> {reg.event.location || "En ligne"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {reg.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>{new Date(reg.event.startDate).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/events/${reg.event.id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">
                                                Voir le programme
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
    );
}
