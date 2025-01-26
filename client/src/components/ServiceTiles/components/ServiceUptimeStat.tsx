import { useEffect, useState, useRef } from 'react';
import { formatMSToDDHHMMSS } from '../../../lib/dateFormatting';
import { isFailingServiceType } from '../../../lib/typeGuards';
import { ServiceData, WorkingServiceData } from '../../../types/main.types';
import { ServiceTileProps } from '../ServiceTile';
import { ServiceStats } from '../Tiles.style';
import { DATE_RANGE } from '../../AvailabilityCharts/useAvailabilityChartLogic';

const SERVICE_UPTIME_UPDATE_INTERVAL = 1000;
const DATA_START_DATE_MS = Date.now() - DATE_RANGE;

export const ServiceUptimeStat = (props: ServiceTileProps) => {
    const [serviceUptimeMS, setServiceUptime] = useState<number>(0);
    const [previousServiceActivityState, setPreviousServiceActivityState] =
        useState<boolean>(props.serviceData.isActive);

    useEffect(() => {
        setServiceUptime(serviceRunningSince(props.serviceData));
        const interval = setInterval(() => {
            setServiceUptime(serviceRunningSince(props.serviceData));
        }, SERVICE_UPTIME_UPDATE_INTERVAL);
        return () => clearInterval(interval);
    }, [props.serviceData]);

    useEffect(() => {
        if (!previousServiceActivityState && props.serviceData.isActive) {
            setServiceUptime(0);
        }
    }, [props.serviceData.isActive]);

    return (
        <>
            {isFailingServiceType(props.serviceData) ? (
                <ServiceStats>
                    rozpoczęcie awarii: {props.serviceData.downSinceDate}
                </ServiceStats>
            ) : (
                <ServiceStats>
                    czas działania: {formatMSToDDHHMMSS(serviceUptimeMS)}
                </ServiceStats>
            )}
        </>
    );
};
const serviceRunningSince = (serviceData: ServiceData) => {
    const { downtimes } = serviceData;
    if (downtimes.length === 0) {
        return Date.now() - serviceData.lastDowntimeEndDate;
    }
    const lastDowntime = downtimes[downtimes.length - 1];
    if (lastDowntime && 'downTill' in lastDowntime) {
        return Date.now() - lastDowntime.downTill;
    } else if (lastDowntime && 'downSince' in lastDowntime) {
        return Date.now() - lastDowntime.downSince;
    } else {
        return Date.now() - DATA_START_DATE_MS;
    }
};
