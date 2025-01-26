import { useAvailabilityChartLogic } from './useAvailabilityChartLogic';
import { LinearChart } from './AvailabilityChart.style';
import { DownTime } from '../../types/main.types';

export type AvailabilityChartProps = {
    downtimes: DownTime[];
    isActive: boolean;
};

export const AvailabilityChart = (props: AvailabilityChartProps) => {
    const { data, options } = useAvailabilityChartLogic(props);

    return <LinearChart type="line" data={data} options={options} />;
};
