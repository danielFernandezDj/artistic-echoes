import { render, screen } from '@testing-library/react';
import { AuthModalProvider } from '@/context/AuthModalContext';
import SignInButton from '@/components/ui/SignInButton';
import { SessionProvider } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
})

test('renders Sign In button when not authenticated', () => {
    render(
        <SessionProvider session={null}>
            <AuthModalProvider>
                <SignInButton />
            </AuthModalProvider>
        </SessionProvider>
    );

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
});

test('renders user avatar and name when authenticated', () => {
    const mockSession = {
        user: {
            name: 'John Doe',
            email: 'jhon@example.com',
            image: 'https://example.com/john.jpg',
        },
        expires: '1',
    }

    render(
        <SessionProvider session={mockSession}>
            <AuthModalProvider>
                <SignInButton />
            </AuthModalProvider>
        </SessionProvider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
})