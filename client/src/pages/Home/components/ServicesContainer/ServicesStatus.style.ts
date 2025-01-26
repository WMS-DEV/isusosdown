import styled from "styled-components";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";

export const Gradient = styled.div`
  background: linear-gradient(45deg, #d900ff, #001aff);
  background-size: cover;
`

export const Container = styled.div`
    padding: 0 7vw 4vh 7vw;
    width: 100%;
    min-height: 25vh;
    height: auto;
    background-color: black;
    position: relative;

    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2vh 2vw;
    > a, > div  {
        flex: 1 0 31%; 
        max-width: 31%;
    }


    @media (max-width: ${GlobalMediaQueries.Tablet}) {
        > a, > div {
            flex: 1 0 46%; 
            max-width: 46%;
        }
        padding: 0 5vw 4vh 5vw;
    }

    @media (max-width: ${GlobalMediaQueries.Mobile}) {
        > a, > div {
            flex: 1 0 96%;
            max-width: 100%
            
        }
    }
`;

