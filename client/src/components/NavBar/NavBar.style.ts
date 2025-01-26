import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {GlobalColorsEnum} from "../../assets/globalStyleVariables";
import {fadeInFromLeft, fadeInFromSmallLeft} from "../Animations/fadeIns";
import {GlobalMediaQueries} from "../../assets/globalMediaQueries";

interface NavBarProps {
    visible: boolean;
}

export const navBarHeightInVH = 6.5
export const NavBarContainer = styled.div<NavBarProps>`
  width: 100%;
  height: ${navBarHeightInVH}vh;
  background-color: black;
  position: fixed;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  z-index: 5;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${props => (props.visible ? '0' : '-100%')});
`

export const IsUsosDownLogo = styled.div`
  color: white;
  font-weight: 900;
  font-style: italic;
  font-size: 4vh;
  padding: 1.5vh 1vw 1.5vh 0.5vw;
  position: relative;
  display: inline-block;

  &:after {
    margin: -6px 0 6px 0;
    content: '';
    display: block;
    width: 0;
    height: 4px;
    background-color: ${GlobalColorsEnum.AccentViolet};
    transition: width 0.3s ease; /* Transition the width property */
  }

  &:hover::after {
    width: 100%; /* Expand the width to create the underline effect */
  }
    
    @media screen and (max-width: ${GlobalMediaQueries.Mobile}){
        font-size: 3.2vh;
    }
`
export const PoweredByText = styled.h3`
  color: ${GlobalColorsEnum.MainText};
  height: 6.5vh;
  text-align: center;
  line-height: 6.5vh;
  margin: 0 0.4rem 0 0;
  animation: ${fadeInFromLeft} 0.8s ease-in-out forwards;
  cursor: default;
    @media screen and (max-width: ${GlobalMediaQueries.Tablet}){
        display: none;
    }
`

export const NoStyleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: auto;
`
export const LinkWrapper = styled(NavLink)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`

export const Wrapper = styled.div`
  height: 100%;
  width: auto;
  display: inline-flex;
  padding: 1.25vh 1vw 1.5vh 1.25vw;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`
export const LogoContainer = styled.div`
  opacity: 0;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  animation: ${fadeInFromSmallLeft} 0.8s ease-in-out 0.3s forwards;
    @media screen and (max-width: ${GlobalMediaQueries.Tablet}){
        display: none;
        
    }
`

export const NavButtonsWrapper = styled.span`
  display: inline-flex;
  width: auto;
  height: 100%;
`