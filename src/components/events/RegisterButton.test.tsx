import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterButton from './RegisterButton';

// Mock useRouter
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh,
    }),
}));

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('RegisterButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders "S\'inscrire" when not registered', () => {
        render(<RegisterButton eventId={1} isRegistered={false} />);
        expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    });

    test('renders "Inscrit" when registered', () => {
        render(<RegisterButton eventId={1} isRegistered={true} />);
        expect(screen.getByText("Inscrit")).toBeInTheDocument();
    });

    test('calls API on click', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        render(<RegisterButton eventId={1} isRegistered={false} />);

        const button = screen.getByText("S'inscrire");
        fireEvent.click(button);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/registrations", expect.objectContaining({
                method: "POST",
                body: JSON.stringify({ eventId: 1 })
            }));
        });

        expect(mockRefresh).toHaveBeenCalled();
    });
});
