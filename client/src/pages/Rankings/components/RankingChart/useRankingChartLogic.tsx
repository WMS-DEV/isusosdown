import React, { useEffect } from 'react';
import { ServiceRankingData } from '../../../../types/main.types';
import { RankingCategories } from '../../../../types/main.types';
import { RankingChartProps, SortedStatus } from './RankingChart';
import { getRankingStats } from '../../../../lib/fetch';
import { formatMsToYYYYMMDD } from '../../../../utils/formatMsToDHM';

/*
TODO: Add support for multiple groups, and remove this constant
*/
const DEFAULT_GROUP_ID = 1;

const scoreScalingTransformation = (
  rankingStats: ServiceRankingData,
): ServiceRankingData => {
  return { ...rankingStats, downtimeScore: rankingStats.downtimeScore * 10 };
};

type RankingDataTranformation = (
  data: ServiceRankingData,
) => ServiceRankingData;

export const useRankingChartLogic = ({
  startDate,
  endDate,
  rankingCategory,
}: RankingChartProps) => {
  const [servicesRankingData, setServicesRankingData] = React.useState<
    ServiceRankingData[]
  >([]);
  const [maxResult, setMaxResult] = React.useState<number>(0);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  const [sortStatus, setSortStatus] = React.useState<SortedStatus>(
    SortedStatus.DESCENDING,
  );

  const getCurrentCategoryResults = (
    rankingCategory: RankingCategories,
    services: ServiceRankingData[],
  ) => {
    const result = services.map(
      (service) => service[rankingCategory] as number,
    );
    return result;
  };

  const sortServices =
    (sortType: SortedStatus, rankingCategory: RankingCategories) =>
    (services: ServiceRankingData[]) => {
      const sortedServices = [...services];
      sortedServices.sort((serviceA, serviceB) => {
        const serviceAResult = serviceA[rankingCategory] as number;
        const serviceBResult = serviceB[rankingCategory] as number;
        return (
          (serviceAResult - serviceBResult) *
          (sortType === SortedStatus.ASCENDING ? 1 : -1)
        );
      });
      return sortedServices;
    };

  const handleSortServices = (sort: SortedStatus) => () => {
    setServicesRankingData(sortServices(sort, rankingCategory));
    setSortStatus(sort);
  };

  const getMaxCurrentCategoryResult = (
    rankingCategory: RankingCategories,
    servicesRankingData: ServiceRankingData[],
  ) => {
    return Math.max(
      ...getCurrentCategoryResults(rankingCategory, servicesRankingData),
    );
  };
  const transformRankingServicesData = (
    rankingsStats: ServiceRankingData[],
    transformations: RankingDataTranformation[],
  ): ServiceRankingData[] =>
    rankingsStats.map((stats) =>
      transformations.reduce((accum, current) => current(accum), stats),
    );

  const handleDateChange = async (startDate: number, endDate: number) => {
    let rankingStats = await getRankingStats(
      formatMsToYYYYMMDD(startDate),
      formatMsToYYYYMMDD(endDate),
      DEFAULT_GROUP_ID,
    );

    rankingStats = transformRankingServicesData(rankingStats, [
      scoreScalingTransformation,
    ]);

    rankingStats = sortServices(sortStatus, rankingCategory)(rankingStats);
    setServicesRankingData(rankingStats);
    setIsFetching(false);
  };

  useEffect(() => {
    handleDateChange(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    setMaxResult(
      getMaxCurrentCategoryResult(rankingCategory, servicesRankingData),
    );
  }, [rankingCategory, servicesRankingData]);

  useEffect(() => {
    setServicesRankingData(sortServices(sortStatus, rankingCategory));
  }, [rankingCategory]);

  return {
    servicesRankingData,
    maxResult,
    handleSortServices,
    sortStatus,
    isFetching,
  };
};
