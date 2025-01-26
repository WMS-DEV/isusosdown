import styled from "styled-components";
import {GlobalColorsEnum} from "../../assets/globalStyleVariables";
import {FooterContainer, FooterLeftText} from "./Footer.style";

export const SlimFooterContainer = styled(FooterContainer)`
  height: 10vh;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: ${GlobalColorsEnum.DarkGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenteredFooterText = styled(FooterLeftText)`
  text-align: center;
`
