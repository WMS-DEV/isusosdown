import { BigChart } from '../../../../components/BigCharts/BigChart';
import { ServiceHeadToHeadStats } from '../../HeadToHead';
import useHeadToHeadChartData, {
  HEAD_TO_HEAD_BORDER_COLORS,
} from '../useHeadToHeadChart';
import { MultiDatasetBigChart } from '../../../../components/MultidatasetBigChart/MultiDatasetBigChart';
import config from '../../../../config.json'

const CHART_TITLE = config.headToHeadLengthChartTitle;
const CHART_LABEL = config.headToHeadLengthChartLabel;

const HeadToHeadDowntimesLengthChart = ({
  services,
}: {
  services: ServiceHeadToHeadStats[];
}) => {
  const { labels, datasets } = useHeadToHeadChartData({
    services,
    type: 'length',
  });
  const chartConfig = {
    title: CHART_TITLE,
    label: CHART_LABEL,
    unit: 'godz.',
  };
  return (
    <>
      <MultiDatasetBigChart
        chartData={{ labels, datasets }}
        chartConfig={chartConfig}
        unit={chartConfig.unit}
        colors={HEAD_TO_HEAD_BORDER_COLORS}
      />
    </>
  );
};

export default HeadToHeadDowntimesLengthChart;
