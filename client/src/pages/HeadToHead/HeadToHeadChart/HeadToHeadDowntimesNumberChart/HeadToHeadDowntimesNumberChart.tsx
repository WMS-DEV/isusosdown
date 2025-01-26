import { ServiceHeadToHeadStats } from '../../HeadToHead';
import useHeadToHeadChartData, {
  HEAD_TO_HEAD_BORDER_COLORS,
} from '../useHeadToHeadChart';
import { MultiDatasetBigChart } from '../../../../components/MultidatasetBigChart/MultiDatasetBigChart';
import config from '../../../../config.json'

const CHART_TITLE = config.headToHeadNumberChartTitle;
const CHART_LABEL = config.headToHeadNumberChartLabel;

const HeadToHeadDowntimesNumberChart = ({
  services,
}: {
  services: ServiceHeadToHeadStats[];
}) => {
  const { labels, datasets } = useHeadToHeadChartData({
    services,
    type: 'number',
  });
  const chartConfig = {
    title: CHART_TITLE,
    label: CHART_LABEL,
    unit: '',
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

export default HeadToHeadDowntimesNumberChart;
