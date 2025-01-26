export const formatMsToDHM = (ms: number) => {
  const result = [];

  result.push(Math.floor(ms / (1000 * 60 * 60 * 24)));
  ms %= 1000 * 60 * 60 * 24;

  result.push(Math.floor(ms / (1000 * 60 * 60)));
  ms %= 1000 * 60 * 60;

  result.push(Math.floor(ms / (1000 * 60)));

  return result;
};

export const formatMsToYYYYMMDD = (ms: number) => {
  const date = new Date(ms);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};
