import styled from "styled-components";
import {GlobalColorsEnum} from "../../../assets/globalStyleVariables";

export const ButtonLabel = styled.a`
  position: relative;
  transition: 0.5s;
`

export const ButtonContainer = styled.button`
  text-align: center;
  vertical-align: middle;
  line-height: calc(2vh - 4px);
  position: relative;
  overflow: hidden;
  border-style: solid;
  padding: 1vh 0.75vw 1vh 0.75vw;
  font-size: 2vh;
  height: 4vh;
  border-radius: 35px;
  border-color: ${GlobalColorsEnum.MainText};
  border-width: 2px;
  background-color: transparent;
  color: ${GlobalColorsEnum.MainText};
  

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 130%;
    height: 110%;
    background-color: ${GlobalColorsEnum.MainText};
    transform: translate(-110%, 0) skew(-30deg);
    transition: 0.5s;
  }

  &:hover {
    cursor: pointer;
    border-color: transparent;
  }

  &:hover ${ButtonLabel} {
    color: ${GlobalColorsEnum.Main};
  }

  &:hover::before {
    transform: translate(-5%, 0) skew(-15deg);
  }
`