import { ServiceHeadToHeadBasicStatsProps } from '../HeadToHeadBasicStats/HeadToHeadBasicStats';
import { transformHeadToHeadIntoSimiliarWebScoreNames } from '../HeadToHeadUtils';
import { HeadtoHeadTrafficScoreName } from './HeadToHeadTrafficStats.style';
import HeadToHeadStatsColumn from '../HeadToHeadBasicStats/components/HeadToHeadBasicStatsColumn';
import { ServiceTrafficStats } from '../HeadToHead';
import { useCallback } from 'react';

const HeadToHeadTrafficStats = ({
  services,
}: ServiceHeadToHeadBasicStatsProps) => {
  const getTrafficStatsNames = useCallback(() => {
    return transformHeadToHeadIntoSimiliarWebScoreNames({
      ...services[0],
      trafficStats: {
        ...services[0]?.trafficStats,
        ...services[1]?.trafficStats,
      } as ServiceTrafficStats,
    });
  }, [services]);

  return (
    <>
      {getTrafficStatsNames().map((scoreName: string, index: number) => {
        return (
          <HeadtoHeadTrafficScoreName key={index} row={index} column={1}>
            {scoreName}
          </HeadtoHeadTrafficScoreName>
        );
      })}

      <HeadToHeadStatsColumn
        column={2}
        service={services[0]}
        rowOffset={1}
        type={'traffic'}
      />
      <HeadToHeadStatsColumn
        column={3}
        service={services[1]}
        rowOffset={1}
        type={'traffic'}
      />
    </>
  );
};

export default HeadToHeadTrafficStats;
