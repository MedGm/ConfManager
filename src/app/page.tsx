import Link from "next/link";
import { Calendar, Users, Mic, ChevronRight, Clock, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const events = await prisma.event.findMany({
    take: 3,
    orderBy: { startDate: 'asc' },
    include: {
      sessions: { take: 1 } // Preview 1 session
    }
  });
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">


      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            La solution complète pour vos <span className="text-indigo-600">Conférences</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Gérez vos événements, inscriptions et plannings en toute simplicité.
            Une plateforme intuitive pour organisateurs et participants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/api/auth/signin" className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition flex items-center gap-2">
              Commencer maintenant
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition">
              Voir la démo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Fonctionnalités Clés</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-indigo-500" />}
              title="Gestion de Planning"
              desc="Générez et modifiez les plannings de conférences avec une interface intuitive."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-indigo-500" />}
              title="Inscriptions Simples"
              desc="Système complet de gestion des participants et des billets."
            />
            <FeatureCard
              icon={<Mic className="w-8 h-8 text-indigo-500" />}
              title="Gestion des Speakers"
              desc="Centralisez les informations de vos intervenants et leurs sessions."
            />
          </div>
        </div>
      </section>

      {/* Schedule / Upcoming Events */}
      <section id="schedule" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Prochains Événements</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {events.length === 0 ? (
              <p className="text-center text-slate-500">Aucun événement programmé pour le moment.</p>
            ) : (
              events.map((event: any) => (
                <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition">
                  <div className="flex-shrink-0 bg-indigo-50 p-4 rounded-xl text-center min-w-[100px] flex flex-col justify-center">
                    <span className="block text-indigo-600 font-bold text-xl">
                      {new Date(event.startDate).getDate()}
                    </span>
                    <span className="block text-indigo-900 font-medium uppercase text-sm">
                      {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location || "En ligne"}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                      <Link href="/auth/signin" className="text-indigo-600 font-medium hover:underline text-sm flex items-center gap-1">
                        Voir le programme détaillé <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 bg-slate-900 text-slate-400 text-center">
        <p>&copy; 2026 ConfManager. Projet Gestion Conférence - Équipe 7.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  )
}
