import styled from "styled-components"
import gradient from "../../assets/backgrounds/isusosdown-gradient1.webp"
import {GlobalMediaQueries} from "../../assets/globalMediaQueries";

export const ServiceDetailsContainer = styled.div`
  position: relative;
  background: url(${gradient});
  color: white;
  margin: auto;
  display: flex;
  align-items: center;
  border-radius: 30px;
  font-size: 3rem;
`

export const ServiceDetailsBackground = styled.div`
  background-color: black;
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Gradient = styled.div`
  background: linear-gradient(45deg, #d900ff, #001aff);
  background-size: cover;
`

export const TilesWrapper = styled.div`
  padding: 2vh 5vw 3vh 5vw;
  display: inline-flex;
  justify-content: center;
  //flex-direction: 
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  background-color: black;
  gap: 1vw;
`


export const BreakDownContainerGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto auto;
    gap: 1vw;
    width: 100%;
    
    @media (max-width: ${GlobalMediaQueries.Laptop}) {
        grid-template-columns: 1fr;
    }
`;

export const TextContainerGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1vw;
`