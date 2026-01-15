import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ORGANIZER") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error('[TASKS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ORGANIZER") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, description, status, priority, sprint, assignee } = body;

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                sprint,
                assignee
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error('[TASKS_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
