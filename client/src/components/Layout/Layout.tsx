import {ReactNode, useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import { SlimFooter } from '../Footer/SlimFooter';
import {LayoutWrapper} from "./Layout.style";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();
    const isErrorPage = useCallback(() => {
        return !['/', '/rankings'].includes(location.pathname) && !location.pathname.startsWith('/service/');
    }, [location.pathname])

    return (
        <LayoutWrapper>
            <NavBar />
            {children}
            {isErrorPage() ? <SlimFooter /> : <Footer />}
        </LayoutWrapper>
    );
}

export default Layout;