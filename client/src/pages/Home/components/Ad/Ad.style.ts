import styled from "styled-components";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";
import {fadeInFromBot} from "../../../../components/Animations/fadeIns";
import {sharedAnimation, TileContainer} from "../../../../components/ServiceTiles/Tiles.style";
import {GlobalColorsEnum} from "../../../../assets/globalStyleVariables";

export const ClickableImage = styled.img`
  position: absolute;
  top: 5%;
  right: 2%;
  cursor: pointer;
  width: 2vw;
  height: auto;
  opacity: 0.2;
    
    @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
        width: 6vw;
    }
    
`;

export const AdTileContainer = styled(TileContainer)<{ image: string }>`
    background: url(${props => props.image}) no-repeat center center;
    background-size: contain;
    background-color: ${GlobalColorsEnum.Main};
    position: relative;
    animation: ${fadeInFromBot} 0.5s ease-in-out 0.3s forwards;
    width: 100%;
    height: 100%;
    
    animation: ${sharedAnimation(4)};
`;