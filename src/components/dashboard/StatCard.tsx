import { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string;
    value: number;
    icon: LucideIcon;
    variant: "indigo" | "emerald" | "blue" | "purple";
};

const variants = {
    indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-600"
    },
    emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600"
    },
    blue: {
        bg: "bg-blue-50",
        text: "text-blue-600"
    },
    purple: {
        bg: "bg-purple-50",
        text: "text-purple-600"
    }
};

export default function StatCard({ title, value, icon: Icon, variant = "indigo" }: StatCardProps) {
    const styles = variants[variant] || variants.indigo;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition duration-300">
            <div className={`p-4 rounded-xl ${styles.bg} flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${styles.text}`} />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{value}</p>
            </div>
        </div>
    )
}
