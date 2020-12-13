export const formatTimeString = (date) => new Date(date).toTimeString().substring(0, 8);

export const getFullDate = (date) => {
  const dateObj = new Date(date);
  let currentDate = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  currentDate = currentDate < 10 ? `0${currentDate}` : currentDate;
  month = month < 10 ? `0${month}` : month;
  return `${currentDate}/${
    month}/${
    year}`;
};

export const getFullTime = (date) => {
  const dateObj = new Date(date);
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours}:${
    minutes}:${
    seconds}`;
};

export const dateFormatter = (date) => `${getFullDate(date)} (${getFullTime(date)})`;
