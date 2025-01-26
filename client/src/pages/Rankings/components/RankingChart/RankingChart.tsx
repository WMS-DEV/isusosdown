import React from 'react';
import { ServiceRankingData } from '../../../../types/main.types';
import {
  ChartMainContainer,
  ChartTitle,
  ChartTitleContainer,
  NoDataMessage,
  ServicesListContainer,
} from './RankingChart.style';
import { RankingCategories } from '../../../../types/main.types';
import { useRankingChartLogic } from './useRankingChartLogic';
import { ServiceRanking } from './ServiceRanking/ServiceRanking';
import { SortButton } from '../SortButton/SortButton';
import { ServiceRankingShuffler } from '../ServiceRankingShuffler/ServiceRankingShuffler';
import { LoaderRankings } from '../../../../components/Loaders/LoaderRankings';

export interface RankingChartProps {
  startDate: number;
  endDate: number;
  rankingCategory: RankingCategories;
}

export enum SortedStatus {
  ASCENDING = 'Sorted ASC',
  DESCENDING = 'Sorted DES',
  NOT_SORTED = 'Not sorted',
}

const categoryNamesMapping = {
  [RankingCategories.score]: 'Wynik [0-10]',
  [RankingCategories.downtimes]: 'Liczba przestojów',
  [RankingCategories.totalDuration]: 'Całkowity czas przestojów [h]',
  [RankingCategories.averageDuration]: 'Średni czas przestojów [h]',
};

export const RankingChart = (props: RankingChartProps) => {
  const {
    servicesRankingData,
    maxResult,
    handleSortServices,
    sortStatus,
    isFetching,
  } = useRankingChartLogic(props);

  if (isFetching) {
    return <LoaderRankings />;
  }

  if (servicesRankingData.length === 0) {
    return <NoDataMessage>Brak danych dla danego okresu.</NoDataMessage>;
  }

  return (
    <ChartMainContainer>
      <ChartTitleContainer>
        <ChartTitle>{categoryNamesMapping[props.rankingCategory]}</ChartTitle>
        <SortButton
          sortingType={SortedStatus.ASCENDING}
          currentSortStatus={sortStatus}
          sortCb={handleSortServices}
        />
        <SortButton
          sortingType={SortedStatus.DESCENDING}
          currentSortStatus={sortStatus}
          sortCb={handleSortServices}
        />
      </ChartTitleContainer>
      <ServicesListContainer>
        <ServiceRankingShuffler>
          {servicesRankingData.map((serviceRankingData: ServiceRankingData) => (
            <ServiceRanking
              serviceRankingData={serviceRankingData}
              maxResult={maxResult}
              rankingCategory={props.rankingCategory}
              key={serviceRankingData.serviceUrl}
            />
          ))}
        </ServiceRankingShuffler>
      </ServicesListContainer>
    </ChartMainContainer>
  );
};
