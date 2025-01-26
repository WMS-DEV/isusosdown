import {DetailsContainer, PoweredByWrapper, PoweredByText, WmsWebLogo} from "./TrafficStatsTile.style";
import {Argument, Line, Value, ValuesWrapper} from "../DetailedStatsTile/DetailedStats.style";
import {formatMsToDHM} from "../../../../../utils/formatMsToDHM";
import wmsWebLogo from "../../../../../assets/logos/wmsWebLogo.png";

export interface TrafficStats {
    totalVisitsThisMonth: number,
    bounceRatePercentage: number,
    pagesPerVisit: number,
    averageVisitDurationMillis: number,
}


export const TrafficStatsTile = ({data}: { data: TrafficStats }) => {


    return (

        !data ? null :

        <DetailsContainer>

            <Line>
                <Argument>Wizyt w tym miesiącu:</Argument>
                <Value end={data.totalVisitsThisMonth}/>
            </Line>

            <Line>
                <Argument>Bounce Rate:</Argument>
                <Value end={data.bounceRatePercentage} suffix={"%"}/>
            </Line>

            <Line>
                <Argument>Pages per visit:</Argument>
                <Value end={data.pagesPerVisit}/>
            </Line>

            <Line>
                <Argument>Średnia długość wizyty:</Argument>
                {animateTime(formatMsToDHM(data.averageVisitDurationMillis))}
            </Line>

            <PoweredByWrapper>
                <PoweredByText>Powered by </PoweredByText>
                <WmsWebLogo src={wmsWebLogo}/>
            </PoweredByWrapper>

        </DetailsContainer>
)


    function animateTime(serviceData: number[]) {

        return <ValuesWrapper>
            {toValue("d ", serviceData[0])}
            {toValue("h ", serviceData[1])}
            {toValue("m", serviceData[2])}
        </ValuesWrapper>


        function toValue(suffix: string, data: number) {
            return <> {data ? <Value end={data} suffix={suffix}/> : null}</>;
        }
    }
}