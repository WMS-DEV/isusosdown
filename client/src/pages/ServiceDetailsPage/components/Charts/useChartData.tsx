import {DowntimeChartElement} from "../../ServiceDetailsPage";
import {serviceDetailsChartProps} from "../../../../components/BigCharts/BigChart.type";

interface ChartTypeMapping {
    number: keyof DowntimeChartElement;
    length: keyof DowntimeChartElement;
}

const chartTypeMappings: ChartTypeMapping = {
    number: 'numberOfDowntimes',
    length: 'totalDowntimeLengthMillis',
};

export function useChartData(chartData: serviceDetailsChartProps['chartData'], chartType: 'number' | 'length') {

    const startDate = new Date(chartData.startDateMillis);
    const now = new Date();
    const dateLabels = getDateLabels(startDate, now);

    const labels = dateLabels.map((dateLabel) => {
        const formattedDate = formatDate(dateLabel);
        const chartEntry = toChartEntry(dateLabel);
        return toLabel(formattedDate, chartEntry, chartType);
    });

    const finalData = {
        labels: labels.map((label) => label.date),
        data: labels.map((label) => label.value),
    };

    return { ...finalData };


    //Helper functions:
    function formatDate(dateLabel: Date) {
        return dateLabel.toLocaleDateString();
    }

    function toChartEntry(dateLabel: Date) {
        return chartData.data.find((entry: DowntimeChartElement) => {
            const entryDate = new Date(
                entry.dateOfDowntimes[0],
                entry.dateOfDowntimes[1] - 1,
                entry.dateOfDowntimes[2]
            );
            return (
                entryDate.getFullYear() === dateLabel.getFullYear() &&
                entryDate.getMonth() === dateLabel.getMonth() &&
                entryDate.getDate() === dateLabel.getDate()
            );
        });
    }

    function toLabel(formattedDate: string, chartEntry: DowntimeChartElement | undefined, chartType: 'number' | 'length') {

        const dataField = chartTypeMappings[chartType] as keyof DowntimeChartElement;
        const value = chartEntry ? chartEntry[dataField] : 0

        return {
            date: formattedDate,
            value: chartType === 'length' ? Math.round(+value / (1000 * 60)) : +value,
        };
    }

    function getDateLabels(startDate: Date, now: Date) {
        const dateLabels = [];
        const currentDate = new Date(startDate);
        while (currentDate <= now) {
            dateLabels.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateLabels;
    }
}
