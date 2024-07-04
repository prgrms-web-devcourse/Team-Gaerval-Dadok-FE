export const SEARCH_PARAMS_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REDIRECT_PATHNAME: 'from',
};

// prefix 'PUBLIC_' for public cookie
export const COOKIE_KEYS = {
  ACCESS_TOKEN: process.env.DADOK_SESSION_KEY || '',
  REFRESH_TOKEN: 'RefreshToken',
  PUBLIC_USER_ID: 'UID',
};

export const SECRET_KEYS = {
  JWT: process.env.JWT_SECRET_KEY || '',
};
