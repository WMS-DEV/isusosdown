import {
    ServiceDetailsBackground,
    TilesWrapper,
    Gradient,
    TextContainerGroup,
    BreakDownContainerGroup
} from "./ServiceDetailsPage.style";
import {ServiceDetailsPageLogic} from "./ServiceDetailsPageLogic";
import {Banner} from "./components/Banner";
import {StatusTile} from "./components/Tiles/StatusTile/StatusTile";
import {UptimeTile} from "./components/Tiles/StatTiles/UptimeTile.ts";
import {NumberOfDowntimesTile} from "./components/Tiles/StatTiles/NumberOfDowntimesTile";
import {TotalTimeOfDowntimesTile} from "./components/Tiles/StatTiles/TotalTimeOfDowntimesTile";
import {DetailedStatsTile} from "./components/Tiles/DetailedStatsTile/DetailedStats";
import {bigChartTillTodayData} from "../../components/BigCharts/BigChart.type";
import {TrafficStats, TrafficStatsTile} from "./components/Tiles/TrafficStatsTile/TrafficStatsTile";
import {ServiceDetailePageLoader} from "./ServiceDetailePageLoader";
import {useEffect} from "react";
import {NumberOfDowntimesChart, DowntimeLengthChart} from "./components/Charts/DowntimeCharts";

export interface IServiceDetailsData {
    isActive: boolean;
    serviceName: string,
    serviceUrl: string;
    "recordedDowntimes": number,
    "totalDowntimeMillis": number,
    "totalUptimeMillis": number,
    "averageDowntimeLengthMillis": number,
    "averageUptimeLengthMillis": number,
    "recordingStatsSinceMillis": number,
    "chart": DowntimeChartElement[],
    "trafficStats": TrafficStats,
}

export interface DowntimeChartElement {
    dateOfDowntimes: [number, number, number],
    numberOfDowntimes: number,
    totalDowntimeLengthMillis: number
}


export const ServiceDetailsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const serviceName: string = window.location.pathname.substring(9)

    let serviceData = ServiceDetailsPageLogic(serviceName)

    if (!serviceData)
        return <ServiceDetailePageLoader serviceName={serviceName} />

    const crashCountChartData: bigChartTillTodayData = {
        startDateMillis: serviceData.recordingStatsSinceMillis,
        data: serviceData.chart
    }


    return (
        <>
            <ServiceDetailsBackground>

                <Banner serviceName={serviceData.serviceName} serviceUrl={serviceData ? serviceData.serviceUrl : ""}/>

                <Gradient>
                    <TilesWrapper>
                        <TextContainerGroup>
                            <StatusTile serviceData={serviceData}/>
                            <UptimeTile serviceData={serviceData}/>
                            <NumberOfDowntimesTile serviceData={serviceData}/>
                            <TotalTimeOfDowntimesTile serviceData={serviceData}/>
                        </TextContainerGroup>
                        <BreakDownContainerGroup>
                            <DowntimeLengthChart chartData={crashCountChartData}/>
                            <DetailedStatsTile serviceData={serviceData}/>
                        </BreakDownContainerGroup>
                        <TrafficStatsTile data={serviceData.trafficStats}/>
                        <NumberOfDowntimesChart chartData={crashCountChartData}/>
                    </TilesWrapper>
                </Gradient>

            </ServiceDetailsBackground>
        </>
    )
}