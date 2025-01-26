import {Container, Argument, Value, Line, ValuesWrapper} from "./DetailedStats.style";
import {IServiceDetailsData} from "../../../ServiceDetailsPage";
import {formatMsToDHM} from "../../../../../utils/formatMsToDHM";
import {CirclePulseLoader} from "../../../../../components/Loaders/CirclePulseLoader";

interface StatTileProps {
    serviceData: IServiceDetailsData;
}


export const DetailedStatsTile = ({serviceData}: StatTileProps) => {


    if (!serviceData)
        return (<>
            <Container>
                <CirclePulseLoader/>
            </Container>
        </>)

    const averageDowntime = formatMsToDHM(serviceData.averageDowntimeLengthMillis)
    const averageUptime = formatMsToDHM(serviceData.averageUptimeLengthMillis)
    const totalUptime = formatMsToDHM(serviceData.totalUptimeMillis)
    const dataScopeSince = new Date(serviceData.recordingStatsSinceMillis)

    function animateTime(serviceData: number[]) {

        assertInputLength();

        return <ValuesWrapper>
            {toValue("d ", serviceData[0])}
            {toValue("h ", serviceData[1])}
            {toValue("m", serviceData[2])}
        </ValuesWrapper>


        function toValue(suffix: string, data: number) {
            return <> {data ? <Value end={data} suffix={suffix}/> : null}</>;
        }

        function assertInputLength() {
            if (serviceData.length !== 3) throw Error('Expected result size of 3')
        }
    }

    return (
        <>
            <Container>

                <Line data-testid={"detailed-stats-average-downtime-line"}>
                    <Argument>Średnia długość awarii:</Argument>
                    {animateTime(averageDowntime)}
                </Line>

                <Line data-testid={"detailed-stats-average-uptime-line"}>
                    <Argument>Średnia długość działania:</Argument>
                    {animateTime(averageUptime)}
                </Line>

                <Line data-testid={"detailed-stats-total-uptime-line"}>
                    <Argument>Łączny czas działania:</Argument>
                    {animateTime(totalUptime)}
                </Line>

                <Line>
                    <Argument>Zakres danych od:</Argument>
                    <ValuesWrapper>
                        <Value end={dataScopeSince.getDate()} suffix={"."}
                               prefix={dataScopeSince.getDate() < 10 ? "0" : ""}/>
                        <Value end={dataScopeSince.getMonth() + 1} suffix={"."}
                               prefix={dataScopeSince.getMonth() < 10 ? "0" : ""}/>
                        <Value end={dataScopeSince.getFullYear()} separator={""}/>
                    </ValuesWrapper>
                </Line>

            </Container>
        </>
    )
}