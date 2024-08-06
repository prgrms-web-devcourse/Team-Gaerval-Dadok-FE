export const DATA_URL = {
  placeholder:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjWL9+/X8ABysDDapsaG4AAAAASUVORK5CYII=', // data url for placeholder color (#AFAFAF)
};

export const KAKAO_LOGIN_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;
