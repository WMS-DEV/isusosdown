import { ServiceHeadToHeadStats, ServiceTrafficStats } from './HeadToHead';

export interface ScoreNamesMap {
  [key: string]: string;
  recordedDowntimes: string;
  totalDowntimeMillis: string;
  totalUptimeMillis: string;
  averageDowntimeLengthMillis: string;
}

export interface SimiliarWebScoreNamesMap {
  [key: string]: string;
  totalVisitsThisMonth: string;
  bounceRatePercentage: string;
  pagesPerVisit: string;
  averageDowntimeLengthMillis: string;
}

export type ScoreKeyName = keyof (typeof HEAD_TO_HEAD_SCORES_NAMES_MAP &
  typeof HEAD_TO_HEAD_SIMILIARWEB_SCORES_NAMES_MAP);

const HEAD_TO_HEAD_SCORES_NAMES_MAP = {
  recordedDowntimes: 'Liczba awarii',
  totalDowntimeMillis: 'Łączny Downtime',
  totalUptimeMillis: 'Łączny Uptime',
  averageDowntimeLengthMillis: 'Średni Downtime',
};

const HEAD_TO_HEAD_SIMILIARWEB_SCORES_NAMES_MAP = {
  totalVisitsThisMonth: 'Łącznie wizyt',
  bounceRatePercentage: 'Bounce rate',
  pagesPerVisit: 'Strony na wizytę',
};

const transformWithMap = (obj: any, map: any): any[] => {
  if (!obj) {
    return [];
  }
  return Object.keys(obj)
    .filter((key: string) => key in map)
    .map((key: string) => map[key]);
};

const getEntriesOfPropsInMap = (obj: any, map: any): any[] => {
  if (!obj) {
    return [];
  }
  return Object.keys(obj)
    .filter((key: string) => key in map)
    .map((key: string) => [key, obj[key]]);
};
export const getBasicStatsEntries = (serviceStats?: ServiceHeadToHeadStats) => {
  return getEntriesOfPropsInMap(serviceStats, HEAD_TO_HEAD_SCORES_NAMES_MAP);
};
export const getTrafficStatsEntries = (
  serviceStats?: ServiceHeadToHeadStats,
) => {
  return getEntriesOfPropsInMap(
    serviceStats?.trafficStats,
    HEAD_TO_HEAD_SIMILIARWEB_SCORES_NAMES_MAP,
  );
};

export const transformHeadToHeadIntoScoreNames = (
  serviceStats: ServiceHeadToHeadStats,
): string[] => {
  return transformWithMap(serviceStats, HEAD_TO_HEAD_SCORES_NAMES_MAP);
};

export const transformHeadToHeadIntoSimiliarWebScoreNames = (
  serviceStats: ServiceHeadToHeadStats,
): string[] => {
  if (!serviceStats) {
    return [];
  }
  return transformWithMap(
    serviceStats.trafficStats as ServiceTrafficStats,
    HEAD_TO_HEAD_SIMILIARWEB_SCORES_NAMES_MAP,
  );
};

export const transformHeadToHeadServiceIntoServiceName = (
  serviceStats: ServiceHeadToHeadStats[],
): string[] => {
  if (!serviceStats) {
    return [];
  }
  return serviceStats.map((serviceStats) =>
    serviceStats.serviceName.toUpperCase(),
  );
};
export const transformHeadToHeadServiceToMainScore = (
  serviceStats: ServiceHeadToHeadStats[],
): { score: number }[] => {
  if (!serviceStats) {
    return [];
  }
  return serviceStats.map((serviceStats) => ({
    score: serviceStats.allTimeDowntimeScore,
  }));
};

export const isHeadToHeadServiceWinnerByName = (
  serviceStats: ServiceHeadToHeadStats[],
  serviceName: string,
): boolean => {
  if (!serviceStats) {
    return false;
  }
  const winnerName = serviceStats.reduce(
    (prev, current) =>
      prev.score > current.allTimeDowntimeScore
        ? prev
        : {
            score: current.allTimeDowntimeScore,
            serviceName: current.serviceName,
          },
    { score: 0, serviceName: '' },
  ).serviceName;
  return winnerName.toUpperCase() === serviceName.toUpperCase();
};
