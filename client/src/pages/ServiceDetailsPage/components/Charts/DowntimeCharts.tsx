import {serviceDetailsChartProps} from "../../../../components/BigCharts/BigChart.type";
import {BigChart} from "../../../../components/BigCharts/BigChart";
import {useChartData} from "./useChartData";


export const DowntimeLengthChart = ({ chartData }: serviceDetailsChartProps) => {
    const finalData = useChartData(chartData, 'length');

    const chartConfig = {
        title: 'Czas trwania awarii',
        label: 'Czas trwania awarii',
        unit: 'min.',
    };

    return finalData.labels ? (
        <BigChart chartData={finalData} chartConfig={chartConfig} unit={chartConfig.unit} />
    ) : null;
};

export const NumberOfDowntimesChart = ({ chartData }: serviceDetailsChartProps) => {
    const finalData = useChartData(chartData, 'number');

    const chartConfig = {
        title: 'Liczba awarii w czasie',
        label: 'Ilość awarii',
        unit: '',
    };

    return finalData.labels ? (
        <BigChart chartData={finalData} chartConfig={chartConfig} unit={chartConfig.unit} />
    ) : null;
};

