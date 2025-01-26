import { getBigChartOptions } from '../BigCharts/BigChart';
import { ChartContainer, LinearChart } from '../BigCharts/BigChart.style';
import { bigChartOptions } from '../BigCharts/BigChart.type';

export interface Dataset {
    label: string;
    data: number[];
}

export interface StylizedDataset extends Dataset {
    borderWidth: number;
    fill: boolean;
}

export interface MultiDatasetBigChartData {
    labels: string[];
    datasets: Dataset[];
}

export interface MultiDatasetBigChartProps {
    chartData: MultiDatasetBigChartData;
    chartConfig: bigChartOptions;
    unit: string;
    colors: string[];
}

export const MultiDatasetBigChart = ({
    chartData,
    chartConfig,
    unit,
    colors,
}: MultiDatasetBigChartProps) => {
    const finalData = {
        labels: chartData.labels,
        datasets: chartData.datasets.map((dataset: Dataset, index) => {
            return {
                label: dataset.label,
                data: dataset.data,
                borderWidth: 3,
                backgroundColor: colors[index],
                borderColor: colors[index],
            };
        }),
    };

    const options = getBigChartOptions(unit, chartConfig.title);
    return (
        <ChartContainer>
            <LinearChart type="line" data={finalData} options={options} />
        </ChartContainer>
    );
};
