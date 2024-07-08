import { COOKIE_KEYS } from '@/constants';
import { getCookie } from '@/utils/cookie';

const checkAuthentication = () => {
  const accessToken = getCookie(COOKIE_KEYS.PUBLIC_USER_ID);
  return !!accessToken;
};

export { checkAuthentication };
