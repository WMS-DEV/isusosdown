import {
  ChartContainer,
  titleStyle,
  LinearChart,
  ticksStyle,
  xGridStyle,
  yGridStyle,
  lineStyle,
  pointStyle,
} from './BigChart.style';
import { bigChartProps } from './BigChart.type';
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

export const getBigChartOptions = (unit: string, title?: string) =>
  ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        ...titleStyle,
      },
      tooltip: {
        callbacks: {
          label: function (item: {
            dataset: { label: any };
            formattedValue: any;
          }) {
            return `${item.dataset.label}: ${item.formattedValue} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: xGridStyle,
        ticks: {
          maxTicksLimit: 3,
          limit: 8,
          maxRotation: 0,
          ...ticksStyle,
        },
      },
      y: {
        grid: yGridStyle,
        ticks: {
          ...ticksStyle,
          precision: 0,
          callback: function (value: string | number) {
            return value + (unit ? ' ' + unit : '');
          },
        },
      },
    },
    elements: {
      line: lineStyle,
      point: pointStyle,
    },
  } as _DeepPartialObject<
    CoreChartOptions<'line'> &
      ElementChartOptions<'line'> &
      PluginChartOptions<'line'> &
      DatasetChartOptions<'line'>
  >);

export const BigChart = ({ chartData, chartConfig, unit }: bigChartProps) => {
  const finalData = {
    labels: chartData.labels,
    datasets: [
      {
        label: ' ' + chartConfig.label,
        data: chartData.data,
        borderWidth: 3,
        fill: false,
      },
    ],
  };

  const options = getBigChartOptions(unit, chartConfig.title);
  return (
    <ChartContainer>
      <LinearChart type="line" data={finalData} options={options} />
    </ChartContainer>
  );
};
