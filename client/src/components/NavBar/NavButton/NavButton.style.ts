import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {GlobalColorsEnum} from "../../../assets/globalStyleVariables";
import {GlobalMediaQueries} from "../../../assets/globalMediaQueries";

export const NavButtonContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  @media screen and (max-width: ${GlobalMediaQueries.Mobile}){
      padding: 0.5rem 0.5rem;
  }
`

export const NavButtonLabel = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  color: ${GlobalColorsEnum.MainText};
  
  &:hover{
    color: ${GlobalColorsEnum.AccentPink}
  }
    
    @media screen and (max-width: ${GlobalMediaQueries.Tablet}){
        font-size: 1.5rem;
    }
    @media screen and (max-width: ${GlobalMediaQueries.Mobile}){
        font-size: 1.2rem;
    }
`