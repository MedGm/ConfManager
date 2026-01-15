/**
 * @jest-environment node
 */
import { GET } from './route';
import { prisma } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
    prisma: {
        event: {
            findMany: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('Events API', () => {
    test('GET returns events', async () => {
        const mockEvents = [
            { id: 1, title: 'Test Event' }
        ];
        (prisma.event.findMany as jest.Mock).mockResolvedValue(mockEvents);

        const req = new Request('http://localhost/api/events');
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toHaveLength(1);
        expect(data[0].title).toBe('Test Event');
    });
});
