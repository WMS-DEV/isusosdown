import styled from "styled-components";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";

export const Container = styled.div`
    font-size: 1.5vw;
    flex-grow: 1;
    aspect-ratio: 3 / 2 !important;
    background-size: cover;
    background: linear-gradient(45deg, #d900ff, #001aff) fixed;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 25vh;
    
    @media (max-width: ${GlobalMediaQueries.Laptop}) {
        height: 15vh;
    }
    
    @media (max-width: ${GlobalMediaQueries.Tablet}) {
        font-size: 4vw;
    }
    
    @media (max-width: ${GlobalMediaQueries.Mobile}) {
        font-size: 3.5vw;
    }
`
