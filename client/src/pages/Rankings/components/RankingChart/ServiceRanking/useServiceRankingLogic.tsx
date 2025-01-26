import React, { useEffect } from "react";
import { ServiceRankingProps } from "./ServiceRanking";
import {
  RankingCategories,
  ServiceRankingData,
} from "../../../../../types/main.types";

const msToHours = (ms: number) => {
  return ms / 1000 / 60 / 60;
};


const mapResultsToUnits = (rankingCategory: RankingCategories, service: ServiceRankingData) => {

  const mapping = {

    [RankingCategories.downtimes]: service[RankingCategories.downtimes],
    [RankingCategories.totalDuration]: msToHours(service[RankingCategories.totalDuration]),
    [RankingCategories.averageDuration]: msToHours(service[RankingCategories.averageDuration]),
    [RankingCategories.score]: service[RankingCategories.score],

  }

  return mapping[rankingCategory] || service[rankingCategory];

}

export const useServiceRankingLogic = ({
  serviceRankingData,
  maxResult,
  rankingCategory,
}: ServiceRankingProps) => {
  const [percentageResult, setPercentageResult] = React.useState<number>(0);

  useEffect(() => {
    const newPercentageResult =
      ((serviceRankingData[rankingCategory] as number) / maxResult) * 100;

    if (newPercentageResult <= 100) {
      setPercentageResult(newPercentageResult);
    }
  }, [rankingCategory, maxResult, serviceRankingData]);

  return {
    percentageResult,
    rankingResult: mapResultsToUnits(
      rankingCategory,
      serviceRankingData,
    ) as number,
    serviceName: serviceRankingData.serviceName,
    serviceUrl: serviceRankingData.serviceUrl,
  };
};
