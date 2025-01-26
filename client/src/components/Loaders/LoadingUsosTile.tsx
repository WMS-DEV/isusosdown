import styled from "styled-components";
import {
    UsosTileContainer
} from "../ServiceTiles/Tiles.style";
import {CirclePulseLoader} from "./CirclePulseLoader";

export const LoadingUsosTile = () => {

    return (
        <>
            <Container>
                <CirclePulseLoader/>
            </Container>

        </>
    )
}

const Container = styled(UsosTileContainer)`
  height: 240px;
  background: white;
  color: black;
  position: relative;
  min-width: max(20em, 20vw);
  margin-bottom: 3rem;
  visibility: hidden;
  align-items: center;
  justify-items: center;
  animation: 0;
`