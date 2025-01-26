import {InvSpacer, Title} from "../Tiles/Headers.style";
import {CirclePulseLoader} from "../../../../components/Loaders/CirclePulseLoader";
import {Container} from "../Tiles/Tiles.style";

export const TileLoader = () => {

    return (
        <>
            <Container>
                <Title>Uptime</Title>

                <CirclePulseLoader/>

                <InvSpacer/>
            </Container>

        </>)
}