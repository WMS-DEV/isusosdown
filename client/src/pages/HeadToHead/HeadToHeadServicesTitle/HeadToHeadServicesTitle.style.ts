import styled from 'styled-components';
import { GlobalMediaQueries } from '../../../assets/globalMediaQueries';

export const HeadToHeadServiceTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  margin: 1vh;
  font-size: 4vh;
  font-weight: 800;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 2vh;
  }
`;
export const DecorativeCenteredText = styled.div`
  position: absolute;
  left: 48%;
  color: white;
  top: 20%;
  font-size: 4vh;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    display: none;
  }
`;
export const HeadToHeadServicesNameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  margin: 2vh 0;
  color: white;
  grid-column-start: 2;
  grid-column-end: 4;
  position: relative;
`;

export const HeadToHeadTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;
