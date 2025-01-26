import styled, { keyframes } from 'styled-components';
import { GlobalColorsEnum } from '../../../assets/globalStyleVariables';
import { GridPosition } from '../HeadToHead.style';
import { GlobalMediaQueries } from '../../../assets/globalMediaQueries';

export const HeadToHeadScoreBarContainer = styled.div<GridPosition>`
  border-radius: 10px;
  margin: auto;
  height: 60%;
  width: 80%;
  background-color: ${GlobalColorsEnum.LightGray};
  grid-column-start: ${(props) => props.column};
  grid-row-start: ${(props) => props.row};
  position: relative;
`;
const fillScoreBar = keyframes` 
    0% {
        width: 0%;
    }
`;

export const HeadToHeadFilledScoreBar = styled.div<{ percentageWidth: number }>`
  background-color: ${GlobalColorsEnum.LightYellow};
  border-radius: 10px;
  height: 100%;
  width: ${(props) => props.percentageWidth * 100}%;
  animation: ${fillScoreBar} 1s ease-in-out;
`;
export const HeadToHeadMainScoreName = styled.div`
  width: 90%;
  background-color: black;
  text-align: center;
  font-size: 4vh;
  padding-bottom: 2vh;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 3vh;
  }
`;

export const HeadToHeadMainScoreValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  margin: auto;
  font-size: 3vh;
  font-weight: 700;
  color: white;
  text-align: center;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 2vh;
  }
`;

export const HeadToHeadMainScoreNameContainer = styled.div`
  background-color: black;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
`;
