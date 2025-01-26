import {
    ServiceData,
    FailingServiceData,
    WorkingServiceData,
    ServiceDataRaw,
    DownTime,
    StartedDownTime,
    FullDownTime,
    EndedDownTime,
} from '../types/main.types';

export function isFailingServiceType(
    service: ServiceDataRaw | ServiceData,
): service is FailingServiceData {
    return 'downSince' in service;
}
export function isWorkingServiceType(
    service: ServiceDataRaw | ServiceData,
): service is WorkingServiceData {
    return !('downSince' in service);
}
export function isDownTimeType(downTime: any): downTime is DownTime {
    return 'downSince' in downTime && 'downTill' in downTime;
}
export function isEndedDownTime(downTime: DownTime): downTime is EndedDownTime {
    return 'downTill' in downTime && !('downSince' in downTime);
}
export function isStartedDownTime(
    downTime: DownTime,
): downTime is StartedDownTime {
    return 'downSince' in downTime && !('downTill' in downTime);
}
export function isFullDownTime(downTime: DownTime): downTime is FullDownTime {
    return 'downSince' in downTime && 'downTill' in downTime;
}
