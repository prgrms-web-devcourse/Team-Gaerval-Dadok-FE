export const toDayFromMillseconds = (value: number) => {
  return Math.ceil(value / (1000 * 60 * 60 * 24));
};
