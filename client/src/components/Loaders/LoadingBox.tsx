import styled, {keyframes} from "styled-components";
import {GlobalColorsEnum} from "../../assets/globalStyleVariables";

const loading = keyframes`
  to {
    background-position: 315px 0, 0 0, 15px 140px, 65px 145px;
  }
`

export const LoadingBox = styled.span`
  width: 1000px;
  height: 1000px;
  background: linear-gradient(0.25turn, transparent, ${GlobalColorsEnum.Inactive}, transparent),
  linear-gradient(${GlobalColorsEnum.DarkGray}, ${GlobalColorsEnum.DarkGray}),
  linear-gradient(${GlobalColorsEnum.DarkGray}, ${GlobalColorsEnum.DarkGray});
  background-color: ${GlobalColorsEnum.DarkGray};
  background-repeat: no-repeat;
  background-position: -315px 0, 0 0, 15px 140px, 65px 145px;
  animation: ${loading} 1.5s infinite;
`