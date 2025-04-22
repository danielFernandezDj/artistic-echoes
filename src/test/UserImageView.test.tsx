import { render, screen, waitFor } from '@testing-library/react';
import { AuthModalProvider } from '@/context/AuthModalContext';
import { SessionProvider } from 'next-auth/react';
import UserImageView from '@/components/ui/UserImageView';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
})

test('sets isLiked to true when museumID is in user image IDs', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({ imageID: ['123'] })
    );

    const mockImage = {
        id: '1',
        objectID: '123',
        museumID: '123',
        objectTitle: 'Sunset',
        primaryImage: 'https://example.com/sunset.jpg',
        primaryImageSmall: 'https://example.com/sunset-small.jpg',
        artistName: 'Test Artist',
        artistDisplayBio: '',
        artistWikidata_URL: '#',
        constituentWikidata_URL: '#',
        medium: '',
        artistNationality: '',
        culture: '',
        artistBeginDate: '',
        artistEndDate: '',
        creditLine: '',
        repository: '',
        dimensions: '',
        GalleryNumber: '',
    };

    const mockSetImageView = jest.fn();
    const mockSetSelectedImage = jest.fn();

    render(
        <SessionProvider session={{ user: { email: 'test@test.com' }, expires: '1' }}>
            <AuthModalProvider>
                <UserImageView
                    imageView={true}
                    selectedImage={mockImage}
                    setImageView={mockSetImageView}
                    setSelectedImage={mockSetSelectedImage}
                />
            </AuthModalProvider>
        </SessionProvider>
    );

    // Wait for imageIDs to load
    await waitFor(() => {
        const heartIcon = screen.getByTestId('like-icon');
        expect(heartIcon.getAttribute('class')).toContain('fill-red-500');
    });
});