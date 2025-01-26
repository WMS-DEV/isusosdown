import {Container} from "../Tiles.style";
import {IServiceDetailsData} from "../../../ServiceDetailsPage";
import {Title, BigValueText, InvSpacer} from "../Headers.style";
import CountUp from "react-countup";

interface StatTileProps {
    serviceData: IServiceDetailsData;
}

export const UptimeTile = ({serviceData}: StatTileProps) => {

    const uptimeInt = +((serviceData.totalUptimeMillis / (serviceData.totalUptimeMillis + serviceData.totalDowntimeMillis) * 100).toFixed(2))


    return (
        <>
            <Container>

                <Title>Uptime</Title>

                <BigValueText>
                    <CountUp end={uptimeInt} decimals={2} suffix={"%"}/>
                </BigValueText>

                <InvSpacer/>

            </Container>
        </>
    )
}