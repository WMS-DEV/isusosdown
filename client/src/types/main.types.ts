export interface ServicesRawStatus {
    downServices: ServiceDataRaw[];
    runningServices: ServiceDataRaw[];
    meme: string;
}
export interface ServiceDataRaw {
    title: string;
    uptime: number;
    lastDowntimeEndDate: number;
    downtimes: DownTime[];
    downSince?: number;
    [id: string]: string | number | DownTime[] | boolean | undefined;
}
export type WorkingServiceData = {
    [Property in keyof ServiceDataRaw as Exclude<
        Property,
        'downSince'
    >]: ServiceDataRaw[Property];
} & { isActive: boolean };

export interface FailingServiceData extends WorkingServiceData {
    downSince: number;
    downSinceDate: string;
}

export type ServiceData = WorkingServiceData | FailingServiceData;

export interface ServicesData {
    services: ServiceData[];
}

export type DownTime = FullDownTime | StartedDownTime | EndedDownTime;

export type StartedDownTime = { downSince: number };
export type EndedDownTime = { downTill: number };
export type FullDownTime = StartedDownTime & EndedDownTime;

export type ServiceRankingData = {
    serviceName: string;
    serviceUrl: string;
    recordedDowntimes: number;
    totalDowntimesDuration: number;
    averageDowntimeDuration: number;
    downtimeScore: number;
    [category: string]: string | number;
};

export enum RankingCategories {
    downtimes = 'recordedDowntimes',
    totalDuration = 'totalDowntimesDuration',
    averageDuration = 'averageDowntimeDuration',
    score = 'downtimeScore',
}
