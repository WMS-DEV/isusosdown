import {Container} from "../Tiles/DetailedStatsTile/DetailedStats.style";
import {CirclePulseLoader} from "../../../../components/Loaders/CirclePulseLoader";


export const DetailedStatsTileLoader = () => {

    return (
        <>
            <Container>
                <CirclePulseLoader/>
            </Container>
        </>
    )
}