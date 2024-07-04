import { jwtVerify } from 'jose';

import { SECRET_KEYS } from '@/constants';

export const verifyJWT = async (token: string) => {
  try {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(SECRET_KEYS.JWT);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return false;
  }
};
