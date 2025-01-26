import styled, {keyframes} from "styled-components";
import {GlobalColorsEnum} from "../../assets/globalStyleVariables";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const LoaderRankings = styled.div`
  border: 16px solid ${GlobalColorsEnum.MainText};
  border-top: 16px solid ${GlobalColorsEnum.LightPurple};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;
