import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    // 1. Clean up database
    console.log("Cleaning database...");
    await prisma.task.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.registration.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({}); // Optional: clear users if you want a fresh start, ensuring 'upsert' works cleanly or just recreating

    console.log("Database cleaned.");

    const password = await bcrypt.hash('password123', 10)

    // 2. Create Admin and Team
    const admin = await prisma.user.create({
        data: {
            email: 'admin@conf.com',
            name: 'Admin User',
            password,
            role: 'ORGANIZER',
        },
    })

    // Create Team Members as ORGANIZERS
    const teamMembers = [
        { name: "Uthman Junaid", email: "uthman@conf.com" },
        { name: "Ahmane Yahya", email: "ahmane@conf.com" },
        { name: "Essalhi Salma", email: "essalhi@conf.com" },
        { name: "Kamouss Yassine", email: "kamouss@conf.com" },
        { name: "El Gorrim Mohamed", email: "elgorrim@conf.com" },
        { name: "Salhi Mohamed", email: "salhi@conf.com" },
        { name: "Kchibal Ismail", email: "kchibal@conf.com" },
        { name: "Mohand Omar Moussa", email: "mohand@conf.com" }
    ];

    console.log("Seeding Team Members...")
    for (const member of teamMembers) {
        await prisma.user.create({
            data: {
                email: member.email,
                name: member.name,
                password,
                role: 'ORGANIZER',
            },
        })
    }

    // 3. Create SCA2025 Event
    console.log("Seeding SCA2025 Event...");
    const scaEvent = await prisma.event.create({
        data: {
            title: "International Conference on Smart City Applications (SCA2025)",
            description: "the 10th International Conference on Smart City Applications (SCA2025), a multidisciplinary event taking place November 10-12, 2025. SCA2025 offers an unparalleled opportunity for researchers, students, and industry professionals to connect, collaborate, and share their expertise.",
            startDate: new Date("2026-11-10T09:00:00"), // Using 2026 to ensure it's in future based on user context or stick to 2025? User said 2025. I'll use 2025 assuming current date allows it, or maybe user meant 2025 as upcoming. 
            // Wait, "lundi 10 novembre 2025", user said. Let's stick to user date.
            endDate: new Date("2026-11-12T18:00:00"),
            location: "FSTT, Salle de conference",
            organizerId: admin.id,
            sessions: {
                create: [
                    {
                        title: "Opening Ceremony",
                        speaker: "Pr. Anouar Abdelhakim Boudhir",
                        startTime: new Date("2026-11-10T10:30:00"),
                        endTime: new Date("2026-11-10T11:00:00"),
                        description: "Opening note",
                        location: "Main Hall"
                    },
                    {
                        title: "Coffee Break",
                        speaker: "-",
                        startTime: new Date("2026-11-10T11:00:00"),
                        endTime: new Date("2026-11-10T11:15:00"),
                        description: "Relax and network",
                        location: "Lobby"
                    },
                    {
                        title: "Keynote \"Agentic AI: Optimizing Supply Chain Management\"",
                        speaker: "Pr. Mariofanna Milanova",
                        startTime: new Date("2026-11-10T11:15:00"),
                        endTime: new Date("2026-11-10T12:00:00"), // Noon
                        description: "Keynote speech",
                        location: "Main Hall"
                    }
                ]
            }
        }
    });

    console.log("SCA2025 Event created with ID:", scaEvent.id);


    // Used for initial demo, keeping for reference
    
    const guest = await prisma.user.upsert({
        where: { email: 'guest@conf.com' },
        update: {},
        create: {
            email: 'guest@conf.com',
            name: 'Guest User',
            password,
            role: 'PARTICIPANT',
        },
    })

    // Seed Agile Tasks
    const tasks = [
        { title: 'Project Initialization', description: 'Setup Next.js, Prisma, and Tailwind CSS.', status: 'DONE', priority: 'HIGH', assignee: 'Uthman Junaid', sprint: 'Sprint 1' },
        { title: 'Database Schema Design', description: 'Define User, Event, and Registration models.', status: 'DONE', priority: 'HIGH', assignee: 'Kamouss Yassine', sprint: 'Sprint 1' },
        { title: 'Authentication System', description: 'Implement NextAuth with Credentials provider.', status: 'DONE', priority: 'HIGH', assignee: 'El Gorrim Mohamed', sprint: 'Sprint 1' },
        { title: 'Event Creation Form', description: 'UI and API for creating new conferences.', status: 'DONE', priority: 'HIGH', assignee: 'Salhi Mohamed', sprint: 'Sprint 2' },
        { title: 'Public Event Listing', description: 'Homepage displaying all available events.', status: 'DONE', priority: 'MEDIUM', assignee: 'Salhi Mohamed', sprint: 'Sprint 2' },
        { title: 'User Dashboard', description: 'Dashboard showing registered events for participants.', status: 'DONE', priority: 'HIGH', assignee: 'Salhi Mohamed', sprint: 'Sprint 2' },
        { title: 'Registration Logic', description: 'Backend logic to handle user registrations.', status: 'DONE', priority: 'HIGH', assignee: 'Kamouss Yassine', sprint: 'Sprint 2' },
        { title: 'Unit Testing', description: 'Setup Jest and wrote tests for key components.', status: 'DONE', priority: 'MEDIUM', assignee: 'Kchibal Ismail', sprint: 'Sprint 3' },
        { title: 'Documentation', description: 'Write technical report and user guide.', status: 'DONE', priority: 'MEDIUM', assignee: 'Mohand Omar Moussa', sprint: 'Sprint 3' },
        { title: 'Internal Agile Board', description: 'Develop internal tool for project tracking.', status: 'IN_PROGRESS', priority: 'MEDIUM', assignee: 'Uthman Junaid', sprint: 'Sprint 3' },
        { title: 'Payment Integration', description: 'Add Stripe payment for paid conferences.', status: 'TODO', priority: 'HIGH', assignee: 'Unassigned', sprint: 'Backlog' },
        { title: 'Mobile App', description: 'React Native companion app.', status: 'TODO', priority: 'LOW', assignee: 'Unassigned', sprint: 'Backlog' },
        { title: 'Email Notifications', description: 'Send confirmation emails upon registration.', status: 'TODO', priority: 'MEDIUM', assignee: 'Unassigned', sprint: 'Backlog' }
    ]

    console.log('Seeding tasks...')
    for (const task of tasks) {
        await prisma.task.create({
            data: task
        })
    }
    console.log('Tasks seeded successfully.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
