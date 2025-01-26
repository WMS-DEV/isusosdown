import React from 'react';
import { ServiceRankingData } from '../../../../../types/main.types';
import {
  RankingResultCountUp,
  ServiceRankingBar,
  ServiceRankingContainer,
  ServiceRankingMainContainer,
  ServiceRankingName,
} from './ServiceRanking.style';
import { useServiceRankingLogic } from './useServiceRankingLogic';
import { RankingCategories } from '../../../../../types/main.types';

export interface ServiceRankingProps {
  serviceRankingData: ServiceRankingData;
  maxResult: number;
  rankingCategory: RankingCategories;
}

export const ServiceRanking = (props: ServiceRankingProps) => {
  const { serviceUrl, serviceName, percentageResult, rankingResult } =
    useServiceRankingLogic(props);

  return (
    <ServiceRankingMainContainer>
      <ServiceRankingName to={`/service/${serviceName}`}>
        {serviceName}
      </ServiceRankingName>
      <ServiceRankingContainer>
        <ServiceRankingBar percentageResult={percentageResult}>
          <RankingResultCountUp
            end={rankingResult}
            duration={1}
            decimals={
              props.rankingCategory !== RankingCategories.downtimes ? 2 : 0
            }
          />
        </ServiceRankingBar>
      </ServiceRankingContainer>
    </ServiceRankingMainContainer>
  );
};
