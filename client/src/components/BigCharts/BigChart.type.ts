import {DowntimeChartElement} from "../../pages/ServiceDetailsPage/ServiceDetailsPage";

export interface bigChartData {
    labels: string[],
    data: number[]
}

export interface bigChartOptions {
    title?: string,
    label?: string
}

export interface bigChartProps {
    chartData: bigChartData,
    chartConfig: bigChartOptions,
    unit: string,
}

export interface bigChartTillTodayData {
    startDateMillis: number,
    data: DowntimeChartElement[],
}

export interface serviceDetailsChartProps {
    chartData: bigChartTillTodayData
}