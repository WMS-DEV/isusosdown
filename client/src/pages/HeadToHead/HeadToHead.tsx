import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getHeadToHeadStats } from '../../lib/fetch';
import {
  BannerContainer,
  HeadToHeadContainer,
  HeadToHeadMainContainer,
  HeadToHeadStatsTable,
  HeadToHeadChartsContainer,
} from './HeadToHead.style';
import HeadToHeadServicesTitle from './HeadToHeadServicesTitle/HeadToHeadServicesTitle';
import HeadToHeadBasicStats from './HeadToHeadBasicStats/HeadToHeadBasicStats';
import HeadToHeadTrafficStats from './HeadToHeadTrafficStats/HeadToHeadTrafficStats';
import HeadToHeadDowntimesNumberChart from './HeadToHeadChart/HeadToHeadDowntimesNumberChart/HeadToHeadDowntimesNumberChart';
import HeadToHeadDowntimesLengthChart from './HeadToHeadChart/HeadToHeadDowntimesLenghtChart/HeadToHeadDowntimesLenghtChart';

export interface ServiceTrafficStats {
  totalVisitsThisMonth: number;
  bounceRatePercentage: number;
  averageVisitDurationMilis: number;
  pagesPerVisit: number;
}
export interface HeadToHeadChartDataEntry {
  dateOfDowntimes: [number, number, number];
  numberOfDowntimes: number;
  totalDowntimeLengthMillis: number;
}
export interface ServiceHeadToHeadStats {
  serviceName: string;
  averageDowntimeLengthMilis: number;
  averageUptimeLengthMilis: number;
  recordedDowntimes: number;
  allTimeDowntimeScore: number;
  chart: HeadToHeadChartDataEntry[];
  isActive: boolean;
  totalDowntimeMilis: number;
  totalUptimeMilis: number;
  trafficStats?: ServiceTrafficStats;
  [key: string]:
    | string
    | number
    | boolean
    | ServiceTrafficStats
    | HeadToHeadChartDataEntry[]
    | undefined;
}

const HeadToHead = () => {
  const [services, setServices] = useState<ServiceHeadToHeadStats[]>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queriedServices = queryParams.get('services');
    if (queriedServices) {
      getHeadToHeadStats(queriedServices)
        .then((data) => {
          setServices(data.servicesStats);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <HeadToHeadMainContainer>
      <BannerContainer />
      <HeadToHeadContainer>
        <HeadToHeadStatsTable>
          <HeadToHeadServicesTitle services={services} />
          <HeadToHeadBasicStats services={services} />
        </HeadToHeadStatsTable>
        <HeadToHeadStatsTable>
          <HeadToHeadTrafficStats services={services} />
        </HeadToHeadStatsTable>
        <HeadToHeadChartsContainer>
          <HeadToHeadDowntimesNumberChart services={services} />
          <HeadToHeadDowntimesLengthChart services={services} />
        </HeadToHeadChartsContainer>
      </HeadToHeadContainer>
    </HeadToHeadMainContainer>
  );
};
export default HeadToHead;
