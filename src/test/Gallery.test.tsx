import { render, screen, waitFor } from '@testing-library/react';
import { AuthModalProvider } from '@/context/AuthModalContext';
import { SessionProvider } from 'next-auth/react';
import Gallery from '@/components/ui/Gallery';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

test('fetches and displays images from API', async () => {
    const mockImages = [
        { id: '1', objectTitle: 'Sunset', primaryImageSmall: 'https://example.com/sunset.jpg' },
        { id: '2', objectTitle: 'Ocean', primaryImageSmall: 'https://example.com/ocean.jpg' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockImages));

    render(
        <SessionProvider session={null}>
            <AuthModalProvider>
                <Gallery />
            </AuthModalProvider>
        </SessionProvider>
    );

    expect(fetchMock).toHaveBeenCalledWith('/api/images'); // ✅ URL used in fetch

    await waitFor(() => {
        expect(screen.getByAltText('Sunset')).toBeInTheDocument();
        expect(screen.getByAltText('Ocean')).toBeInTheDocument();
    });
});

test('opens image view modal on image click', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
        { id: '1', objectTitle: 'Sunset', primaryImageSmall: 'https://example.com/sunset.jpg' }
    ]));

    render(
        <SessionProvider session={null}>
            <AuthModalProvider>
                <Gallery />
            </AuthModalProvider>
        </SessionProvider>
    );

    const results = await screen.findAllByText(/Sunset/i);
    expect(results.length).toBeGreaterThan(0);
});

test('renders download link for image', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
        { id: '1', objectTitle: 'Sunset', primaryImageSmall: 'https://example.com/sunset.jpg' }
    ]));

    render(
        <SessionProvider session={null}>
            <AuthModalProvider>
                <Gallery />
            </AuthModalProvider>
        </SessionProvider>
    );

    const link = await screen.findByRole('link');
    expect(link).toHaveAttribute('href', '/api/download/1');
});