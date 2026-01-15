"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition font-medium text-sm"
        >
            <LogOut className="w-4 h-4" />
            Se déconnecter
        </button>
    );
}
