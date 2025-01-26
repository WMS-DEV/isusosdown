import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {ErrorPage} from './ErrorPage';

describe('ErrorPage', () => {
    const renderErrorPage = () => render(
        <MemoryRouter initialEntries={['/nonexistent-page']}>
            <ErrorPage />
        </MemoryRouter>
    );

    it('renders ErrorPage component', () => {
        renderErrorPage();
        expect(screen.getByText(/404/i)).toBeInTheDocument();
    });

    it('navigates to home page when link is clicked', () => {
        renderErrorPage();

        const homeLink = screen.getByText(/STRONA GŁÓWNA/i);

        fireEvent.click(homeLink);

        expect(window.location.pathname).toBe('/');
    });
});