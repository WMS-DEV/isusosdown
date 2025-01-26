import styled from 'styled-components';
import gradient from '../../assets/backgrounds/wms-dev-original-fluid-gradient.webp';
import { NavLink } from 'react-router-dom';
import { AvailabilityChart } from '../AvailabilityCharts/AvailabilityChart';
import { cascadeFadeAnimation } from '../Animations/cascadeFadeIn';
import { GlobalMediaQueries } from '../../assets/globalMediaQueries';
import GlobalStyle from '../../assets/global.style';
import { FontsEnum, GlobalColorsEnum } from '../../assets/globalStyleVariables';

export const sharedAnimation = (index: number) => {
  if (index || index === 0) {
    return cascadeFadeAnimation(index);
  }
};

export const TileContainer = styled.div<{ index?: number }>`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background-size: cover;
  background-image: url(${gradient});
  background-attachment: fixed;
  height: auto;
  min-height: 30vh;
  border-radius: 20px;
  color: white;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s ease-in-out,
    background 0.3s ease-in-out,
    filter 0.3s ease-in-out;
  transform-origin: center center;
  backface-visibility: hidden;
  opacity: 0;

  animation: ${(props) => sharedAnimation(props.index ?? 0)};

  &:hover {
    -webkit-filter: brightness(1.2);
    filter: brightness(1.2);
    animation: ${(props) => sharedAnimation(props.index ?? 0)};
  }
  &:hover {
    -webkit-filter: brightness(1.2);
    filter: brightness(1.2);
  }

  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    max-width: 100%;
  }
`;
export const UsosTileContainer = styled(TileContainer)`
  flex-grow: 0;
  opacity: 0;
  background: ${GlobalColorsEnum.Main};
  color: ${GlobalColorsEnum.MainText};
  position: relative;
  margin: 5vh 0;
  width: 25vw;

  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    width: 90%;
  }

  @media screen and (max-width: ${GlobalMediaQueries.SmallMobile}) {
    width: 100%;
  }

  &:hover {
    -webkit-filter: brightness(1);
    filter: brightness(1);
  }
`;

export const TopTileWrapper = styled.div`
  grid-area: 1;
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const TileName = styled.p`
  white-space: nowrap;
  padding: 0;
  font-weight: 900;
  text-align: center;
  font-size: 2rem;
  @media screen and (min-width: ${GlobalMediaQueries.HighResolution}) {
    font-size: 4vh;
  }
`;

export const StatusDot = styled.div<{ invisible?: boolean; color?: string }>`
  background-color: ${(props) => props.color};
  height: 2vh;
  aspect-ratio: 1;
  border-radius: 50%;
  visibility: ${(props) => (props.invisible ? 'hidden' : 'visible')};
`;

export const StatsContainer = styled.div`
  height: auto;
  margin-left: 5%;
`;

export const ServiceStats = styled.p`
  font-family: ${FontsEnum.Paragraph};
  color: ${GlobalColorsEnum.SecondaryText};
  font-weigh: normal;
  padding: 0;
  font-size: 2vh;
  @media screen and (min-width: ${GlobalMediaQueries.HighResolution}) {
    font-size: 2vh;
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const LinkWrapper = styled(NavLink)`
  text-decoration: none;
  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    width: 90%;
  }

  @media screen and (max-width: ${GlobalMediaQueries.SmallMobile}) {
    width: 100%;
  }
`;
export const StyledAvailabilityChart = styled(AvailabilityChart)`
  height: 100%;
`;
