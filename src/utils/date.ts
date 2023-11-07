export const toDayFromMillseconds = (value: number) =>
  Math.ceil(value / (1000 * 60 * 60 * 24));

export const getDdayCount = (target: Date) =>
  toDayFromMillseconds(target.getTime() - new Date().getTime());
