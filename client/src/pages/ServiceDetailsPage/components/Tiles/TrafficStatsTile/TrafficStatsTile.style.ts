import styled from "styled-components";
import {GlobalColorsEnum} from "../../../../../assets/globalStyleVariables";
import yellowBg from "../../../../../assets/backgrounds/yellow_bg.webp"
import {Container} from "../DetailedStatsTile/DetailedStats.style";

export const DetailsContainer = styled(Container)`
    background-image: url("${yellowBg}");
    color: ${GlobalColorsEnum.DarkGray};
    
`
export const PoweredByWrapper = styled.div`
  bottom: 15px;
  //position: absolute;
  display: inline-flex;
  align-items: center;
  align-self: end;
`

export const PoweredByText = styled.a`
  color: ${GlobalColorsEnum.SimilarWebBlue},
`

export const WmsWebLogo = styled.img`
  height: 1.5rem;
  margin-left: 0.4rem;
`