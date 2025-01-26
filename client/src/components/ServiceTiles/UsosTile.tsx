import {
    UsosTileContainer,
    TileName,
    StatsContainer,
    ServiceStats,
    ChartContainer,
    TopTileWrapper,
    StatusDot,
} from './Tiles.style';
import { ServiceData } from '../../types/main.types';
import { useEffect, useState } from 'react';
import { GlobalColorsEnum } from '../../assets/globalStyleVariables';
import { AvailabilityChart } from '../AvailabilityCharts/AvailabilityChart';
import { ServiceUptimeStat } from './components/ServiceUptimeStat';

interface USOStileProps {
    usosData: ServiceData;
}

export const UsosTile = (props: USOStileProps) => {
    const [activityColor, setActivityColor] = useState<string>();

    useEffect(() => {
        setActivityColor(
            props.usosData?.isActive ? GlobalColorsEnum.Green : GlobalColorsEnum.Red,
        );
    }, [props.usosData.isActive]);

    return (
        <>
            <UsosTileContainer>
                <TopTileWrapper>
                    <StatusDot invisible={true} />
                    <TileName>{props.usosData?.title}</TileName>
                    <StatusDot color={activityColor} />
                </TopTileWrapper>

                <StatsContainer>
                    <ServiceStats>
                        status: {props.usosData.isActive ? 'aktywny' : 'nieaktywny'}
                    </ServiceStats>
                    <ServiceStats>uptime: {props.usosData?.uptime}%</ServiceStats>

                    <ServiceUptimeStat serviceData={props.usosData} />
                </StatsContainer>

                <ChartContainer>
                    <AvailabilityChart
                        downtimes={props.usosData.downtimes}
                        isActive={props.usosData.isActive}
                    />
                </ChartContainer>
            </UsosTileContainer>
        </>
    );
};
