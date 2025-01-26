import styled from "styled-components";
import {LoadingBox} from "../../../../components/Loaders/LoadingBox";
import {LoadingContainer} from "../Tiles/StatusTile/StatusTile.style";

export const LoadingChart = styled(LoadingBox)`
  width: 45vw;
  height: 40vh;
  flex-grow: 2;
  margin: 1vh 0.5vw 1vh 1.5vw;
  border-radius: 20px;
  padding: 1vh 1vw 1vh 1vw;
`