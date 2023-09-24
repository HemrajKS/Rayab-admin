import { NextResponse } from 'next/server';
import { verifyJWT } from './token';
import { getErrorResponse } from './helpers';

export const verifyPass = async (token, user) => {
  const pass = (await verifyJWT(token)).password;

  if (pass !== user) {
    return false;
  }
  return true;
};
