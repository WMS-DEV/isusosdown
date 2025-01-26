import moment from 'moment';

const MS_IN_A_DAY = 86400000;
const MS_IN_A_HOUR = 3600000;
const MS_IN_A_MINUTE = 60000;
const MS_IN_A_SECOND = 1000;

export const getDetailedDate = (ms: number) => {
  return moment(ms).format('YYYY MMM DD HH:mm a');
};

export const getTimeAndOrDate = (ms: number) => {
  const date = new Date(ms);

  if (Date.now() - ms < MS_IN_A_DAY) {
    return date.toLocaleTimeString();
  } else {
    return getDetailedDate(ms);
  }
};

export const formatMSToDDHHMMSS = (ms: number) => {
  const days = Math.floor(ms / MS_IN_A_DAY);
  const hours = Math.floor(ms / MS_IN_A_HOUR) - getHoursFromDays(days);
  const minutes =
    Math.floor(ms / MS_IN_A_MINUTE) -
    getMinutesFromDays(days) -
    getMinutesFromHours(hours);
  const seconds =
    Math.floor(ms / MS_IN_A_SECOND) -
    getSecondsFromDays(days) -
    getSecondsFromHours(hours) -
    getSecondsFromMinutes(minutes);

  return `${days ? days + 'd' : '0d'} ${hours ? hours + 'h' : '0h'} ${minutes ? minutes + 'm' : '0h'} ${seconds ? seconds + 's' : '0s'}`;
};
export const getHoursFromDays = (days: number) => {
  return days * 24;
};
export const getMinutesFromHours = (hours: number) => {
  return hours * 60;
};
export const getSecondsFromMinutes = (minutes: number) => {
  return minutes * 60;
};
export const getSecondsFromDays = (days: number) => {
  return days * 24 * 60 * 60;
};
export const getMinutesFromDays = (days: number) => {
  return days * 24 * 60;
};
export const getHoursFromMinutes = (minutes: number) => {
  return minutes / 60;
};
export const getDaysFromHours = (hours: number) => {
  return hours / 24;
};
export const getDaysFromMinutes = (minutes: number) => {
  return minutes / 24 / 60;
};
export const getSecondsFromHours = (hours: number) => {
  return hours * 60 * 60;
};
