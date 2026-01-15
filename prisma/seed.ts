import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@conf.com' },
        update: {},
        create: {
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
        await prisma.user.upsert({
            where: { email: member.email },
            update: {},
            create: {
                email: member.email,
                name: member.name,
                password, // same password for everyone for easy testing
                role: 'ORGANIZER',
            },
        })
    }

    console.log({ admin })

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
