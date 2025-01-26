import { GlobalColorsEnum } from '../../../assets/globalStyleVariables';
import { MultiDatasetBigChartData } from '../../../components/MultidatasetBigChart/MultiDatasetBigChart';
import {
  HeadToHeadChartDataEntry,
  ServiceHeadToHeadStats,
} from '../HeadToHead';

const MS_IN_HOUR = 1000 * 60 * 60;

type HeadToHeadChartType = 'number' | 'length';

export const HEAD_TO_HEAD_BORDER_COLORS: string[] = [
  GlobalColorsEnum.LightYellow,
  GlobalColorsEnum.LightPurple,
];

const useHeadToHeadChartData = ({
  services,
  type,
}: {
  services: ServiceHeadToHeadStats[];
  type: HeadToHeadChartType;
}): MultiDatasetBigChartData => {
  if (!services || services.length === 0) return { labels: [], datasets: [] };

  const chartData = services.map((service) => service.chart);

  const { labels, data } = joinDataSets(chartData);

  return {
    labels,
    datasets: data.map((dataSet) => ({
      label: services[data.indexOf(dataSet)].serviceName,
      data: dataSet.map((dataSetEntry) =>
        chartTypeToFieldMapping(dataSetEntry, type),
      ),
    })),
  };
};

export default useHeadToHeadChartData;

const chartTypeToFieldMapping = (
  target: HeadToHeadChartDataEntry,
  type: HeadToHeadChartType,
) => {
  if (type === 'number') {
    return target.numberOfDowntimes;
  } else if (type === 'length') {
    return (
      Math.round((100 * target.totalDowntimeLengthMillis) / MS_IN_HOUR) / 100
    );
  } else {
    throw new Error('Invalid chart type');
  }
};

const removeRedundantElements = (array: any[]) => {
  return Array.from(new Set(array));
};

const createDateLabels = (chartData: HeadToHeadChartDataEntry[]) => {
  return chartData.map(createDateLabel);
};

const createDateLabel = (chartDataEntry: HeadToHeadChartDataEntry) => {
  const date = new Date(
    chartDataEntry.dateOfDowntimes[0],
    chartDataEntry.dateOfDowntimes[1] - 1,
    chartDataEntry.dateOfDowntimes[2],
  );
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const flattenArray = (array: any[]) => {
  return array.reduce((acc, val) => acc.concat(val), []);
};

const sortDateLabel = (labelA: string, labelB: string) => {
  const [yearA, monthA, dayA] = createDateFromLabel(labelA);
  const [yearB, monthB, dayB] = createDateFromLabel(labelB);
  if (yearA !== yearB) {
    return yearA - yearB;
  }
  if (monthA !== monthB) {
    return monthA - monthB;
  }
  return dayA - dayB;
};

const createDateFromLabel = (label: string): [number, number, number] => {
  const [day, month, year] = label.split('/');
  return [parseInt(year), parseInt(month), parseInt(day)];
};

const isLabelInDataSet = (
  label: string,
  dataSet: HeadToHeadChartDataEntry[],
  formatFunction: (arg: any) => string,
) => {
  return dataSet.find((dataSetEntry) => {
    const result = formatFunction(dataSetEntry) === label;
    return result;
  });
};

const joinDataSets = (chartData: HeadToHeadChartDataEntry[][]) => {
  const joinedLabels = removeRedundantElements(
    flattenArray(chartData.map((dataSet) => createDateLabels(dataSet))),
  );

  joinedLabels.forEach((label) => {
    chartData.forEach((dataSet) => {
      if (!isLabelInDataSet(label, dataSet, createDateLabel)) {
        dataSet.push({
          dateOfDowntimes: createDateFromLabel(label),
          numberOfDowntimes: 0,
          totalDowntimeLengthMillis: 0,
        });
      }
    });
  });

  const sortedLabels = [...joinedLabels].sort(sortDateLabel);
  const sortedChartData = chartData.map((dataSet) =>
    dataSet.sort((dataSetEntryA, dataSetEntryB) =>
      sortDateLabel(
        createDateLabel(dataSetEntryA),
        createDateLabel(dataSetEntryB),
      ),
    ),
  );

  return { labels: sortedLabels, data: sortedChartData };
};
