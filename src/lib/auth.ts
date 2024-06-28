import { jwtVerify } from 'jose';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const verifyJWT = async (token: string) => {
  try {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return false;
  }
};
