import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { eventId } = await req.json();

        if (!eventId) {
            return NextResponse.json({ error: "Event ID required" }, { status: 400 });
        }

        // Check if already registered
        const existing = await prisma.registration.findUnique({
            where: {
                userId_eventId: {
                    userId: parseInt(session.user.id as string),
                    eventId: parseInt(eventId),
                }
            }
        });

        if (existing) {
            return NextResponse.json({ error: "Already registered" }, { status: 400 });
        }

        const registration = await prisma.registration.create({
            data: {
                userId: parseInt(session.user.id as string),
                eventId: parseInt(eventId),
                status: "CONFIRMED"
            }
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error) {
        console.error("Error registering:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
