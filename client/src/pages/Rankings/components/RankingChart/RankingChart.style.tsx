import styled, {keyframes} from "styled-components";
import { ListShuffler } from "../../../../components/ListShuffler/ListShuffler";
import { MaterialIcon } from "../../../../components/MaterialIcon/MaterialIcon";
import { SortedStatus } from "./RankingChart";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";
import {GlobalColorsEnum} from "../../../../assets/globalStyleVariables";

const appearFromLeft = keyframes`

    from {
        opacity:0;
        transform:translateX(-10%);
    }
    to {
        opacity:1;
        transform:translateX(0);
    }
`;
export const ChartMainContainer = styled.div`
  width: 90vw;
  position: relative;
  margin-top: -1rem;
`;

export const ChartTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  animation:  ${appearFromLeft} 1s ease-in-out;
`;
export const ChartTitle = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:row;
  align-items: center;
  text-align:center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-right: 1rem;
  @media(max-width: ${GlobalMediaQueries.Tablet}){
    font-size:1.5rem;
  }

`

export const ServicesListContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0;
  row-gap: 0;
  margin-top: 4vh;
`;


export const rankingsLinkStyle = {
  color: "white"
}



export const NoDataMessage = styled.p`

    color:white;
    font-size:1.5rem;
    text-align:center;
    margin-top:2rem;
    margin-bottom:2rem;
    @media(max-width: ${GlobalMediaQueries.Tablet}) {
        font-size:1rem;
    }
`
