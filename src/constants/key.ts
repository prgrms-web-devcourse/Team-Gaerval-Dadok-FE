export const SEARCH_PARAMS_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REDIRECT_PATHNAME: 'from',
};

// prefix 'PUBLIC_' for public cookie
export const COOKIE_KEYS = {
  ACCESS_TOKEN: process.env.DADOK_AUTH_SESSION_KEY || '',
  REFRESH_TOKEN: 'RefreshToken',
  ADDED_PROFILE_FLAG: 'DID_APF',
  PUBLIC_USER_ID: 'DID_PUI',
};

// 사용자 인증 관련 세션 쿠키 key
export const SESSION_COOKIES_KEYS = [
  COOKIE_KEYS.ACCESS_TOKEN,
  COOKIE_KEYS.PUBLIC_USER_ID,
  COOKIE_KEYS.ADDED_PROFILE_FLAG,
];

export const SECRET_KEYS = {
  JWT: process.env.JWT_SECRET_KEY || '',
};
