import isClient from '@/utils/isClient';

const webStorage = (key: string) => {
  return {
    get: () => isClient() && (localStorage.getItem(key) ?? null),
    set: (newToken: string) =>
      isClient() && localStorage.setItem(key, newToken),
    remove: () => isClient() && localStorage.removeItem(key),
  };
};

export default webStorage;
