export const toDayFromMillseconds = (value: number) =>
  Math.ceil(value / (1000 * 60 * 60 * 24));

export const getDdayCount = (target: Date) =>
  toDayFromMillseconds(target.getTime() - new Date().getTime());

export const isExpired = (end: string) => {
  return getDdayCount(new Date(end)) < 0;
};

export const formatDateInputValue = (target: string) => {
  const date = new Date(target);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const formattedDate = `${year}.${month}.${day} (${dayOfWeek})`;

  return formattedDate;
};

export const getTodayDate = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const todayDate = new Date(Date.now() - offset);

  return todayDate.toISOString().slice(0, 10);
};
