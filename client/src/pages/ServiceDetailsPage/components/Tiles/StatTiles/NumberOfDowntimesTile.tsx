import {Container} from "../Tiles.style";
import {IServiceDetailsData} from "../../../ServiceDetailsPage";
import {Title, BigValueText, InvSpacer} from "../Headers.style";
import CountUp from "react-countup";

interface StatTileProps {
    serviceData: IServiceDetailsData;
}

export const NumberOfDowntimesTile = ({serviceData}: StatTileProps) => {

    return (
        <>
            <Container>

                <Title>Liczba awarii</Title>

                <BigValueText>
                    <CountUp end={serviceData.recordedDowntimes}/>
                </BigValueText>


                <InvSpacer/>

            </Container>
        </>
    )
}