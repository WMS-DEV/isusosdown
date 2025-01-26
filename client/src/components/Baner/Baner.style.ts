import styled from "styled-components";
import gradient from "../../assets/backgrounds/wms-dev-original-cubism-gradient.webp"
import {navBarHeightInVH} from "../NavBar/NavBar.style";
import {GlobalMediaQueries} from "../../assets/globalMediaQueries";

export const BannerContainer = styled.div`
  width: 100%;
  height: ${14 + navBarHeightInVH}vh;
  background-image: url(${gradient});
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 5vh 0 0 0;
`

export const Title = styled.a`
  margin-top: ${-5 + navBarHeightInVH}vh;
  font-size: 5vw;
  color: white;
  font-weight: 900;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 7vw;
  }
    
  @media (max-width: ${GlobalMediaQueries.Mobile}) {
    font-size: 6vw;
  }

  transition: filter 0.3s ease-in-out;
    
  :hover{
    cursor: pointer;
    -webkit-filter: brightness(0.8);
    filter: brightness(0.8);
  }
    
`