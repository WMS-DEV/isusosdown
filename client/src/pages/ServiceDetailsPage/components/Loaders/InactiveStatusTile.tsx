import { LoadingContainer } from "../Tiles/StatusTile/StatusTile.style";
import {InvSpacer, Title} from "../Tiles/Headers.style";
import {CirclePulseLoader} from "../../../../components/Loaders/CirclePulseLoader";

export const InactiveStatusTile = () => {

    return (
        <LoadingContainer>

            <Title>Status</Title>

            <CirclePulseLoader/>

            <InvSpacer/>

        </LoadingContainer>
    )
}