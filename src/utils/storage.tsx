const tokenStorage = (key: string) => {
  return {
    get: () => localStorage.getItem(key) ?? null,
    set: (newToken: string) => localStorage.setItem(key, newToken),
    remove: () => localStorage.removeItem(key),
  };
};

export default tokenStorage;
