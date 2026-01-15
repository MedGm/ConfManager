import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ORGANIZER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, speaker, startTime, endTime, eventId } = await req.json();

        const sessionData = await prisma.session.create({
            data: {
                title,
                speaker,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                eventId: parseInt(eventId),
            }
        });

        return NextResponse.json(sessionData, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating session" }, { status: 500 });
    }
}
