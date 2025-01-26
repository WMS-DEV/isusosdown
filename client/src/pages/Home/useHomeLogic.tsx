import { useEffect, useState } from 'react';
import {
  ServiceData,
  ServiceDataRaw,
  ServicesRawStatus,
  WorkingServiceData,
  StartedDownTime,
} from '../../types/main.types';
import { connectToWebsocket, getInitialStats } from '../../lib/fetch';
import { isFailingServiceType } from '../../lib/typeGuards';
import { IMessage } from '@stomp/stompjs';
import { getTimeAndOrDate } from '../../lib/dateFormatting';
import config from '../../config.json';
import { DownTimesQueue } from '../../utils/DownTimesQueue';

const USOS_SERVICE_NAME = config.usosServiceName;

/*
TODO: Add support for multiple groups, and remove this constant
*/
const DEFAULT_GROUP_ID = config.defaultGroupId;

export const useHomeLogic = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [meme, setMeme] = useState<string>('');

  const [websocketConnecting, setWebsocketConnecting] =
    useState<boolean>(false);
  const [websocketConnected, setWebsocketConnected] = useState<boolean>(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');

  const updateFromWebSockets = (message: IMessage) => {
    setWebsocketConnected(true);
    setServices(updateServicesUponWebsocketMessage(message));
  };

  useEffect(() => {
    getInitialStats(DEFAULT_GROUP_ID).then(
      (recievedServices: ServicesRawStatus) => {
        const downServices = formatServices(
          recievedServices.downServices,
          false,
        );
        const runningServices = formatServices(
          recievedServices.runningServices,
          true,
        );
        const allServices = downServices.concat(runningServices);
        switchElementToTop(
          allServices,
          compareServiceNameEquality(USOS_SERVICE_NAME),
        );

        setServices(allServices);
        setMeme(recievedServices.meme);
        setLastUpdateTime(getFormattedTime());
      },
    );
  }, []);

  useEffect(() => {
    setWebsocketConnecting(true);

    const handleWebSocketError = (error: any) => {
      console.error('WebSocket error:', error);
      setWebsocketConnected(false);
      setWebsocketConnecting(false);
    };

    connectToWebsocket(
      updateFromWebSockets,
      setWebsocketConnected,
      setWebsocketConnecting,
    );

    setWebsocketConnecting(true);

    window.addEventListener('offline', handleWebSocketError);
    window.addEventListener('error', handleWebSocketError);

    return () => {
      window.removeEventListener('offline', handleWebSocketError);
      window.removeEventListener('error', handleWebSocketError);
    };
  }, []);

  const getFormattedTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString();
  };

  return {
    services,
    meme,
    lastUpdateTime,
    websocketConnecting,
    websocketConnected,
  };
};

const switchElementToTop = (arr: any[], comparator: (arg: any) => boolean) => {
  const indexOfElementToSwitch = arr.findIndex(comparator);

  if (indexOfElementToSwitch > -1) {
    [arr[0], arr[indexOfElementToSwitch]] = [
      arr[indexOfElementToSwitch],
      arr[0],
    ];
  }
};

const compareServiceNameEquality = (name: string) => (service: ServiceData) => {
  return service.title === name;
};

export const updateServicesUponWebsocketMessage =
  (message: IMessage) => (oldState: ServiceData[]) => {
    const messageValue = JSON.parse(message.body);
    const newServices = [...oldState];
    const updatedService = newServices.find(
      compareServiceNameEquality(messageValue['service']),
    );

    if (!updatedService) {
      return newServices;
    }

    const updatedServiceDownTimesQueue = new DownTimesQueue(
      updatedService?.downtimes,
    );

    updatedServiceDownTimesQueue.push(messageValue);

    if (updatedServiceDownTimesQueue.isLastDownTimeFinished()) {
      handleActiveService(updatedService);
    } else {
      handleInactiveService(updatedService);
    }

    updatedService.downtimes = updatedServiceDownTimesQueue.getQueue();

    switchElementToTop(
      newServices,
      compareServiceNameEquality(USOS_SERVICE_NAME),
    );
    return newServices;
  };

export const formatServices = (
  services: ServiceDataRaw[],
  isActive: boolean,
): ServiceData[] => {
  return services.map((service: ServiceDataRaw) => {
    if (isFailingServiceType(service)) {
      const newDowntimes = new DownTimesQueue(service.downtimes);
      if (service.downtimes?.length) {
        newDowntimes.push({
          downSince: service.downSince,
        });
      }

      return {
        ...service,
        isActive: isActive,
        downSinceDate: getTimeAndOrDate(service.downSince),
        downtimes: newDowntimes.getQueue(),
      };
    } else {
      return { ...(service as WorkingServiceData), isActive: isActive };
    }
  });
};

const handleActiveService = (service: ServiceData) => {
  delete service.downSince;
  delete service.downSinceDate;
  service.isActive = true;
};
const handleInactiveService = (service: ServiceData) => {
  // debugger;
  const updatedServiceDownTimes = new DownTimesQueue(service?.downtimes);
  const lastDownTime =
    updatedServiceDownTimes.peakLastDownTime() as StartedDownTime;
  service.isActive = false;
  service.downSince = lastDownTime.downSince;
  service.downSinceDate = getTimeAndOrDate(lastDownTime.downSince);
};
