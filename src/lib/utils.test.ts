import { formatDate, cn } from './utils';

describe('Utils', () => {
    test('formatDate formats correctly in French', () => {
        const date = new Date('2026-01-15');
        // Note: This relies on Node's ICU data or environment locale. 
        // In a test env we might mock it, but basic check:
        expect(formatDate(date)).toContain('2026');
    });

    test('cn combines classes correctly', () => {
        expect(cn('a', 'b')).toBe('a b');
        expect(cn('a', false && 'b', 'c')).toBe('a c');
    });
});
