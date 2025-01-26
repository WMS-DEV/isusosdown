import styled from 'styled-components';
import gradient from '../../assets/backgrounds/wms-dev-original-fluid-gradient.webp';
import { Footer } from '../../components/Footer/Footer';
import { GlobalMediaQueries } from '../../assets/globalMediaQueries';
export const HeadToHeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin-top: 2vh;
  margin: auto;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    width: 90%;
  }
`;
export const BannerContainer = styled.div`
  background: url(${gradient});
  width: 100%;
  height: 10vh;
  background-size: cover;
`;

export const HeadToHeadStatsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  width: 100%;
  color: white;
`;

export const HeadToHeadStatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2vh 0;
  width: 100%;
  grid-column-start: 2;
  grid-column-end: 3;
`;

export interface GridPosition {
  column: number;
  row: number;
}

export const AbsoluteFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  height: 10vh;
  width: 100%;
`;
export const HeadToHeadMainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const HeadToHeadChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 75vw;
  justify-content: space-between;
  margin: 2vh 2vw;
  gap: 2vw;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    flex-direction: column;
    width: 100%;
  }
`;
