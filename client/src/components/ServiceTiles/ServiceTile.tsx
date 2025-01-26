import {
  TileContainer,
  TileName,
  StatsContainer,
  ServiceStats,
  ChartContainer,
  TopTileWrapper,
  StatusDot,
  StyledAvailabilityChart,
} from './Tiles.style';
import { ServiceData } from '../../types/main.types';
import { useEffect, useState } from 'react';
import { GlobalColorsEnum } from '../../assets/globalStyleVariables';
import { ServiceUptimeStat } from './components/ServiceUptimeStat';
import { ScrollText } from './components/ScrollText';

export interface ServiceTileProps {
  serviceData: ServiceData;
  index?: number;
}

export const ServiceTile = (props: ServiceTileProps) => {
  const [activityColor, setActivityColor] = useState<string>();

  useEffect(() => {
    setActivityColor(
      props.serviceData?.isActive
        ? GlobalColorsEnum.BrightGreen
        : GlobalColorsEnum.BrightRed,
    );
  }, [props.serviceData.isActive]);

  return (
    <>
      <TileContainer index={props.index}>
        <TopTileWrapper>
          <StatusDot invisible={true} />
          <TileName>
            <ScrollText>{props.serviceData.title}</ScrollText>
          </TileName>
          <StatusDot color={activityColor} />
        </TopTileWrapper>

        <StatsContainer>
          <ServiceStats>
            status: {props.serviceData.isActive ? 'aktywny' : 'nieaktywny'}
          </ServiceStats>
          <ServiceStats>uptime: {props.serviceData.uptime}%</ServiceStats>

          {/*TODO: Add timer for service uptime; currently PLACEHOLDER*/}
          <ServiceUptimeStat serviceData={props.serviceData} />
        </StatsContainer>

        <ChartContainer>
          <StyledAvailabilityChart
            downtimes={props.serviceData.downtimes}
            isActive={props.serviceData.isActive}
          />
        </ChartContainer>
      </TileContainer>
    </>
  );
};
