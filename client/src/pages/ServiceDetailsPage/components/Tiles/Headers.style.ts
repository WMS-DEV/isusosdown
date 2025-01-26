import styled from "styled-components";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";

export const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 2vw;
  
  @media (max-width: ${GlobalMediaQueries.Mobile}) {
      font-size: 5vw;
  }
    
`

export const BigValueText = styled.h1`
  color: white;
  text-align: center;
  height: auto;
  font-weight: 900;
  margin-top: 0;
  z-index: 1;
`


export const InvSpacer = styled.div`
  visibility: hidden;
  height: 1vw;
`