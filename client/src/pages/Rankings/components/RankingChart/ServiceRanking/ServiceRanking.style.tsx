import styled, { keyframes } from "styled-components";
import { GlobalColorsEnum } from "../../../../../assets/globalStyleVariables";
import CountUp from "react-countup";
import gradient from "../../../../../assets/gradient-ranking.png";
import { Link } from "react-router-dom";
import {GlobalMediaQueries} from "../../../../../assets/globalMediaQueries";


export const ServiceRankingName = styled(Link)`
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  color: white;
  font-size: 1.5rem;
  padding: 0.1rem;
  overflow-wrap: break-word;
  width: 15rem;
  background-color: ${GlobalColorsEnum.LightPurple};
  border-width: 0;
  border-style: solid;
  text-decoration: none;
  border-radius: 1rem;
  :hover {
    transform: scale(1.05);
    background-color: ${GlobalColorsEnum.DarkBlue}; 
    transition: background 0.5s;
  }
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 1.4rem;
    width: 10rem;
    white-space: nowrap;
    text-decoration: underline;
    background-color: ${GlobalColorsEnum.Transparent};
  }
  @media (max-width: ${GlobalMediaQueries.SmallMobile}) {
    font-size: 1.2rem;
    width: 8rem;
  }
`;


export const ServiceRankingContainer = styled.div`
  width: 90%;
  margin: auto;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    margin: 0;
    padding-top: 5px;
  }
  
`;

export const ServiceRankingMainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  border-style: solid;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top-width: 1px;
  border-top-color: ${GlobalColorsEnum.DarkGray};
  padding-top: 1rem;
  
    @media (max-width: ${GlobalMediaQueries.Tablet}) {
        display: block;
        padding-top: 0;
    }
`;

export const ServiceRankingBar = styled.div<{ percentageResult: number }>`
  width: ${(props) => props.percentageResult*0.90}%;
  background: fixed url(${gradient});
  background-size: cover;
  border-radius: 0.5rem;
  //border-style: solid;
  //border-width: 0.1rem;
  position: relative;
  align-items: right;
  transition: all 1s;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const RankingResultCountUp = styled(CountUp)`
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  text-align: left;
  padding-left: 100%;
  margin-left: 5px;
`;
