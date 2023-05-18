const isDateExpired = (date: string) => {
  const today = new Date();
  const targetDate = new Date(date);

  return targetDate.valueOf() <= today.valueOf();
};

export { isDateExpired };
