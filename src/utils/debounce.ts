const debounce = <Params extends unknown[]>(
  func: (...args: Params) => unknown,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default debounce;
