import styled from "styled-components";
import {GlobalColorsEnum} from "../../assets/globalStyleVariables";
import {GlobalMediaQueries} from "../../assets/globalMediaQueries";

export const FooterContainer = styled.div`
  margin-top: 2vh;
  height: auto;
  padding: 1rem 0;
  
  width: 100%;
  background-color: ${GlobalColorsEnum.DarkGray};
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
    
`;

export const FooterLeftText = styled.p`
  color: ${GlobalColorsEnum.MainText};
  font-size: 16px;
  font-weight: 400;
  text-align: right;
  margin: 0 1.5rem 0 0;
  width: 50rem;
`;

export const InfoRightContainer = styled.div`
  height: auto;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0 0 0 1.5rem;
  width: 50rem;
`

export const LogoContainer = styled.div`
  height: 3.5rem;
  margin: 0 0 0.5rem 0;
    
    
    
    @media screen and (max-width: ${GlobalMediaQueries.Tablet}){
        height: 2.5rem;
    }
    @media screen and (max-width: ${GlobalMediaQueries.Mobile}){
        height: 1.5rem;
    }
`