import isClient from '@/utils/isClient';

export const getCookie = (key: string) => {
  if (!isClient()) return;

  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + key.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};
