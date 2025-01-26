import styled, {keyframes} from "styled-components";
import gradient from "../../../../assets/backgrounds/wms-dev-original-cubism-gradient.webp";
import { GlobalColorsEnum} from "../../../../assets/globalStyleVariables";
import {ButtonContainer} from "../../../../components/Buttons/RedirectButton/RedirectButton.style";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";

const neonGlow = keyframes`
  from {
    text-shadow: 0 0 10px ${GlobalColorsEnum.AccentPink}, 0 0 20px ${GlobalColorsEnum.LightPurple}, 0 0 30px ${GlobalColorsEnum.DarkBlue};
  }
  to {
    text-shadow: 0 0 5px ${GlobalColorsEnum.DarkBlue}, 0 0 10px ${GlobalColorsEnum.AccentPink}, 0 0 15px ${GlobalColorsEnum.LightPurple};
  }
`;
export const ErrorCode = styled.h3`
  font-size: 13rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.05em;
  position: relative;
  line-height: 1;
  color: white;
  margin-bottom: 0.2rem;
  animation: ${neonGlow} 3s linear infinite alternate;

  &::after {
    content: '?';
    position: absolute;
    font-size: 14rem;
    transform:  rotate(30deg);
  }


  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 8rem; 
    &::after {
      font-size: 9rem;
    }
  }
  
  @media screen and (max-width: ${GlobalMediaQueries.Mobile}) {
    font-size: 5.5rem; 
    &::after {
      font-size: 6rem;
    }
  }
  
    @media screen and (max-width: ${GlobalMediaQueries.SmallMobile}) {
        font-size: 5rem; 
        &::after {
        font-size: 5.1rem;
        }
    }
`;

export const ErrorButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  column-gap: 3%;
  flex-wrap: wrap;
  row-gap: 1rem;
  margin: 0.3rem 0;
  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    column-gap: 1%;
    row-gap: 0.5rem;
    
  }
`;
export const ErrorButtonLabel = styled.div`
  position: relative;
  transition: 0.5s;
`
export const ErrorButton = styled(ButtonContainer)`
  height: 5vh;
  padding: 1.5vh 2vw;
  margin: 1rem 0.4rem;
  font-size: 1rem;
  background-color: ${GlobalColorsEnum.AccentPink};
  border: none;
  font-weight: 600;
  
  &:before {
    background: linear-gradient(to right, ${GlobalColorsEnum.AccentPink}, ${GlobalColorsEnum.AccentViolet}, ${GlobalColorsEnum.LightPurple});;
  }

  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {})) {
    font-size: 0.7rem;
  }
`;

export const ErrorContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;

export const ErrorContainerMessage = styled.div`
  background: #222222;
  height: 60vh;
  width: 80vw;
  border: 4px solid transparent;
  border-image: url(${gradient}) 10 round round;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  

  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    width: 90vw; 
    height: 50vh;
  }
`;

export const ErrorDescription = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  line-height: 1;
  color: #fff;
  margin: 0.2rem 0.4rem;

  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 0.8rem; 
    font-weight: 600;
  }
`;
