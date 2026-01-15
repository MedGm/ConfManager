import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ORGANIZER") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { title, description, status, priority, sprint, assignee } = body;

        const task = await prisma.task.update({
            where: {
                id: parseInt(id)
            },
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
        console.error('[TASK_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ORGANIZER") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;

        const task = await prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error('[TASK_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
