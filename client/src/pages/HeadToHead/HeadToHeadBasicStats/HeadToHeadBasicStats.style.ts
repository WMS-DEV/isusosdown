import styled from 'styled-components';
import { GridPosition } from '../HeadToHead.style';
import { GlobalMediaQueries } from '../../../assets/globalMediaQueries';

export const HeadToHeadScoreNamesContainer = styled.div`
  color: white;
  margin-right: 2vw;
  margin-left: 2vw;
  background-color: #1a1a1a;
  border-radius: 1vh;
  grid-column-start: 1;
  padding-left: 1vw;
  padding-right: 1vw;
  grid-column-end: 1;
  grid-row-start: 3;
  grid-row-end: 7;
`;

export const HeadToHeadScoreName = styled.div<GridPosition>`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /* text-align: center; */
  font-size: 3vh;
  font-weight: bold;
  padding-left: 1vw;
  padding-right: 1vw;
  width: 90%;
  padding-bottom: 1vh;
  padding-top: 1vh;
  height: 100%;
  text-align: left;
  background-color: #1a1a1a;
  grid-column-start: ${(props) => props.column};
  border-top-right-radius: ${(props) => (props.row === 0 ? '1vh' : '0')};
  border-top-left-radius: ${(props) => (props.row === 0 ? '1vh' : '0')};
  border-bottom-right-radius: ${(props) => (props.row === 3 ? '1vh' : '0')};
  border-bottom-left-radius: ${(props) => (props.row === 3 ? '1vh' : '0')};
  padding-bottom: ${(props) => (props.row === 3 ? '2vh' : '1h')};

  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 1.7vh;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const HeadToHeadStatsInnerTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #1a1a1a;
  border-radius: 1rem;
  padding: 1vh;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 4;
  grid-row-end: 7;
`;

export const HeadToHeadInnerTableCell = styled.div<GridPosition>`
  color: white;
  font-size: 3vh;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  border-right: ${(props) =>
    props.column === 2 ? `1px solid #353535` : 'none'};
  border-left: ${(props) =>
    props.column === 3 ? `1px solid #353535` : 'none'};
  font-weight: bold;
  text-align: center;
  grid-column-start: ${(props) => props.column};
  grid-row-start: ${(props) => props.row};
  border-bottom: ${(props) => (props.row !== 3 ? '1px solid #353535' : 'none')};
  border-top: ${(props) => (props.row === 4 ? '1px solid #353535' : 'none')};
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 2vh;
    flex-direction: column;
  }
`;
