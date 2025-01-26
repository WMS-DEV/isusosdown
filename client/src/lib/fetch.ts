import { IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { ServiceRankingData } from '../types/main.types';

const baseURL = process.env.REACT_APP_BACKEND_URL;
export const url = baseURL + '/api/isusosdown';

const websocketURL = baseURL + '/faker';
export const websocketChannel = 'topic/downtime';

export async function getFetch(endpoint: string, params = {}) {
  const response = await axios.get(url + endpoint, { params });

  return response.data;
}

export async function getInitialStats(groupId: number) {
  return await getFetch(`/initial-stats/${groupId}`);
}

export async function getAdditionalStats(serviceName: string) {
  return await getFetch('/additional-stats/' + serviceName);
}

export async function getRankingStats(
  startDate: string,
  endDate: string,
  groupId: number,
): Promise<ServiceRankingData[]> {
  /*
          startDate: format "yyyy-MM-dd"
      */
  return await getFetch(`/additional-stats/ranking?groupId=${groupId}`, {
    startDate,
    endDate,
  });
}

export async function getHeadToHeadStats(services: string) {
  return await getFetch('/additional-stats/h2h?services=' + services);
}

export function connectToWebsocket(
  callback: (arg: IMessage) => any,
  setWebsocketConnected: (connected: boolean) => void,
  setWebsocketConnecting: (connecting: boolean) => void,
  channel = websocketChannel,
) {
  const stompClient = Stomp.over(function () {
    return new SockJS(websocketURL);
  });

  stompClient.debug = () => {};

  setWebsocketConnecting(true);

  stompClient.connect(
    {},
    function (_frame: any) {
      setWebsocketConnected(true);
      setWebsocketConnecting(false);
      stompClient.subscribe(channel, callback);
    },
    function (error: any) {
      console.error('WebSocket error:', error);
      setWebsocketConnected(false);
      setWebsocketConnecting(false);
    },
  );
}
