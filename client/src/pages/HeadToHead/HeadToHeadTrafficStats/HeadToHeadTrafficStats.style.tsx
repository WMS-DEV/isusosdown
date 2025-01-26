import styled from 'styled-components';
import {
  HeadToHeadScoreName,
  HeadToHeadScoreNamesContainer,
} from '../HeadToHeadBasicStats/HeadToHeadBasicStats.style';
import { GlobalColorsEnum } from '../../../assets/globalStyleVariables';

export const HeadToHeadSimiliarWebStatsNamesContainer = styled(
  HeadToHeadScoreNamesContainer,
)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 4;
  height: auto;
  background-color: ${GlobalColorsEnum.DarkYellow};
  color: black;
  margin-left: 2vw;
`;

export const HeadtoHeadTrafficScoreName = styled(HeadToHeadScoreName)`
  color: ${GlobalColorsEnum.DarkGray};
  background-color: ${GlobalColorsEnum.LightYellow};
  margin-top: ${(props) => (props.row === 0 ? '1vh' : '0px')};
  border-bottom-left-radius: ${(props) => (props.row === 2 ? '1vh' : '0px')};
  border-bottom-right-radius: ${(props) => (props.row === 2 ? '1vh' : '0px')};
`;
