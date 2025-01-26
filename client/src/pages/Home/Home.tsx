import React from 'react';
import { Baner } from './components/Baner/Baner';
import { ServicesStatus } from './components/ServicesContainer/ServicesStatus';
import { useHomeLogic } from './useHomeLogic';
import { PreServiceBar } from './components/PreServiceBar/PreServiceBar';

export const Home: React.FC = () => {
    const {
        services,
        meme,
        lastUpdateTime,
        websocketConnected,
        websocketConnecting,
    } = useHomeLogic();

    return (
        <>
            <Baner usosData={services[0]} jsosMeme={meme} />
            <PreServiceBar
                websocketConnected={websocketConnected}
                lastUpdateTime={lastUpdateTime}
                websocketConnecting={websocketConnecting}
            />
            <ServicesStatus services={services} />
        </>
    );
};
