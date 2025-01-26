import { DownTime, ServiceData, ServicesRawStatus } from '../types/main.types';

const MAX_LENGTH_OF_DOWNTIME = 1000;
const MAX_NUMBER_OF_DOWNTIMES = 10;
const MOCK_SERVICES_TITLES = ['jsos', 'eportal', 'usos', 'parking'];
const MAX_LENGTH_OF_DOWNTIME_MS = 10000;
const MAX_LENGTH_OF_UPTIME_MS = 10000;
const MAX_TOTAL_UPTIME_MS = 100000;
const MAX_RECORDING_STATS_SINCE_MS = 100000;

const generateDowntimeSince = (base: number) => {
  return generateGenericDownTime(base, 'downSince') as { downSince: number };
};

const generateDownTimeTill = (base: number) => {
  return generateGenericDownTime(base, 'downTill') as { downTill: number };
};

const generateGenericDownTime = (
  base: number,
  downType: 'downTill' | 'downSince',
) => {
  return {
    [downType]: base + Math.floor(Math.random() * MAX_LENGTH_OF_DOWNTIME),
  } as { downTill: number } | { downSince: number };
};

const generateCombinedDowntimes = (base: number): DownTime => {
  const downtimeSince = generateDowntimeSince(base);
  const downtimeTill = generateDownTimeTill(downtimeSince.downSince);

  return {
    ...downtimeSince,
    ...downtimeTill,
  };
};

const getLastDownTimeBase = (downtime: DownTime) => {
  if ('downTill' in downtime) {
    return downtime.downTill;
  } else {
    return downtime.downSince;
  }
};
const randomDownTimeType = (base: number) => {
  const randomChoice = Math.random();
  if (randomChoice < 0.33) {
    return generateDowntimeSince(base);
  } else if (randomChoice < 0.66) {
    return generateDownTimeTill(base);
  } else {
    return generateCombinedDowntimes(base);
  }
};
export const generateMockDowntimes = (
  lastDowntimeType: 'downSince' | 'downTill' | undefined,
  downtimesNumber = MAX_NUMBER_OF_DOWNTIMES,
) => {
  const downtimes = Array<DownTime>();
  let lastBase = 0;

  for (let i = 0; i < downtimesNumber; i++) {
    const downtime = randomDownTimeType(lastBase);
    lastBase = getLastDownTimeBase(downtime);
    downtimes.push(downtime);
  }

  if (
    lastDowntimeType &&
    !(lastDowntimeType in downtimes[downtimes.length - 1])
  ) {
    lastBase = getLastDownTimeBase(downtimes[downtimes.length - 1]);

    if (lastDowntimeType === 'downSince') {
      downtimes.push(generateDowntimeSince(lastBase));
    } else {
      downtimes.push(generateDownTimeTill(lastBase));
    }
  }

  return downtimes;
};

const createGenericMockServiceData = (isActive: boolean, title: string) => {
  return {
    title: title,
    uptime: Math.floor(Math.random() * 100),
    downtimes: generateMockDowntimes(isActive ? 'downTill' : 'downSince'),
    isActive: isActive,
  } as ServiceData;
};

const createWorkingMockServiceData = (title: string) => {
  return createGenericMockServiceData(true, title);
};

const createFailingMockServiceData = (title: string) => {
  return createGenericMockServiceData(false, title);
};

export const generateMockServicesData = (
  servicesNumber: number,
): ServiceData[] => {
  if (servicesNumber > MOCK_SERVICES_TITLES.length) {
    throw new Error('Too many services to generate');
  }
  const servicesData = Array<ServiceData>();
  for (let i = 0; i < servicesNumber; i++) {
    const serviceData =
      Math.random() < 0.5
        ? createWorkingMockServiceData(MOCK_SERVICES_TITLES[i])
        : createFailingMockServiceData(MOCK_SERVICES_TITLES[i]);
    servicesData.push(serviceData);
  }

  return servicesData;
};

export const generateMockDetailedStats = () => {
  return {
    averageDowntimeLengthMilis: Math.floor(
      Math.random() * MAX_LENGTH_OF_DOWNTIME_MS,
    ),
    averageUptimeLengthMilis: Math.floor(
      Math.random() * MAX_LENGTH_OF_UPTIME_MS,
    ),
    totalUptimeMilis: Math.floor(Math.random() * MAX_TOTAL_UPTIME_MS),

    recordingStatsSinceMilis: Math.floor(
      Math.random() * MAX_RECORDING_STATS_SINCE_MS,
    ),
  };
};
interface MockDetailedStats {
  averageDowntimeLengthMilis: number;
  averageUptimeLengthMilis: number;
  totalUptimeMilis: number;
  recordingStatsSinceMilis: number;
}

export const generateListOfMockDetailedStats = (length: number) => {
  const stats = Array<MockDetailedStats>(length);
  for (let i = 0; i < length; i++) {
    stats[i] = generateMockDetailedStats();
  }
  return stats;
};

export const generateMockRawInitialStats = (length: number) => {
  const downServices = Array<ServiceData>();
  const runningServices = Array<ServiceData>();

  for (let i = 0; i < length / 2; i++) {
    downServices.push(createFailingMockServiceData(MOCK_SERVICES_TITLES[i]));
  }

  for (let i = length / 2; i < length; i++) {
    runningServices.push(createWorkingMockServiceData(MOCK_SERVICES_TITLES[i]));
  }

  return {
    downServices: downServices,
    runningServices: runningServices,
    meme: 'test-meme',
  } as unknown as ServicesRawStatus;
};
