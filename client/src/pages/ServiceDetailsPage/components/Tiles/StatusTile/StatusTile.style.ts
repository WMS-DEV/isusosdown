import styled, {keyframes} from "styled-components";
import {GlobalColorsEnum} from "../../../../../assets/globalStyleVariables";
import { Container } from "../Tiles.style";

export const TileContainer = styled(Container)<{ isActive: boolean }>`
  background: ${props => props.isActive ? GlobalColorsEnum.LightGreen : GlobalColorsEnum.Red};
  overflow: hidden;
  flex-direction: column;
`

export const LoadingContainer = styled.div`
  background-color: ${GlobalColorsEnum.Inactive};
  aspect-ratio: 3 / 2 !important;
  min-width: 200px;
  max-width: 21vw;
  flex-grow: 1;
  border-radius: 20px;
  margin: 1vh 0.5vw 1vh 0.5vw;
  padding: 1vw 0 1vw 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


//Heart Rate Monitor Styles VVV

export const HeartRateContainer = styled.div`
  margin: -3vh 0 0 0;
  position: relative;
  display: inline-flex;
  padding: 0;
  width: 100%;
`

export const HeartRateSvg = styled.svg`
  width: 100%;
  height: 100%;
`

export const HeartPolyLine = styled.polyline<{ isActive: boolean }>`
  fill: none;
  stroke: ${props => props.isActive ? '#66ff33' : '#ff3300'};
  stroke-width: 3;
  stroke-miterlimit: 10;
  width: 50%;
  height: 50%;
`

const heartRateInFirst = keyframes`
  0% {
    width: 150%;
  }
  100% {
    width: 0%;
  }
`

const heartRateIn = keyframes`
  0% {
    left: -15%;
  }
  100% {
    left: 100%;
  }
`

const heartRateOut = keyframes`
  0% {
    left: -20%;
  }
  100% {
    left: 100%;
  }
`

export const FadeInDiv = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 15%;
  height: 100%;
  background-color: ${props => props.isActive ? '#33cc33' : 'red'};;
  top: 0;
  right: -25%;
  animation: ${heartRateIn} 5s linear infinite;
  animation-delay: 3.5s;
`

export const FadeInDivFirst = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${props => props.isActive ? '#33cc33' : 'red'};
  top: 0;
  right: -50%;
  animation: ${heartRateInFirst} 5s linear 1;
`

export const FadeOutDiv = styled.div`
  position: absolute;
  width: 20%;
  height: 100%;
  top: 0;
  left: -25%;
  animation: ${heartRateOut} 5s linear infinite;
  animation-delay: 3s;
  background: rgba(0, 0, 0, 1);
  background: -moz-linear-gradient(left, rgba(51, 204, 51, 1) 0%, rgba(51, 204, 51, 1) 50%, rgba(51, 204, 51, 0) 100%);
  background: -webkit-linear-gradient(left, rgba(51, 204, 51, 1) 0%, rgba(51, 204, 51, 1) 50%, rgba(51, 204, 51, 0) 100%);
  background: -o-linear-gradient(left, rgba(51, 204, 51, 1) 0%, rgba(51, 204, 51, 1) 50%, rgba(51, 204, 51, 0) 100%);
  background: -ms-linear-gradient(left, rgba(51, 204, 51, 1) 0%, rgba(51, 204, 51, 1) 50%, rgba(51, 204, 51, 0) 100%);
  background: linear-gradient(to right, rgba(51, 204, 51, 1) 0%, rgba(51, 204, 51, 1) 50%, rgba(51, 204, 51, 0) 100%);
`

export const FadeOutDivRed = styled.div`
  position: absolute;
  width: 20%;
  height: 100%;
  top: 0;
  left: -25%;
  animation: ${heartRateOut} 5s linear infinite;
  animation-delay: 3s;
  background: rgb(255, 0, 0, 1);
  background: -moz-linear-gradient(left, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 0, 0, 0) 100%);
  background: -webkit-linear-gradient(left, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 0, 0, 0) 100%);
  background: -o-linear-gradient(left, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 0, 0, 0) 100%);
  background: -ms-linear-gradient(left, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 0, 0, 0) 100%);
  background: linear-gradient(to right, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 0, 0, 0) 100%);
`


