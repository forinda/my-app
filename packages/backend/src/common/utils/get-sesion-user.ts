import { eq } from 'drizzle-orm';
import { ApiError } from '../errors/base';
import type { ApiReq } from '../http';
import { HttpStatus } from '../http';
import { User } from '@/db/schema';
import type { Promised } from '../interfaces/helpers';
import { useDrizzle } from '@/db';
import { CookieProcessor } from './cookie';
import { Config } from '../config';
import { di } from '../di';

export async function getSessionUser(
  request: ApiReq,
  options: { throwError: boolean }
) {
  const conf = di.get(Config);
  const db = useDrizzle();
  // const cookies = request.cookies;
  const cookie = request.signedCookies[conf.conf.SESSION_COOKIE_NAME];

  if (!cookie) {
    if (options.throwError) {
      throw new ApiError('No session cookie found', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }
  const unsignedSession = CookieProcessor.unsign(
    cookie,
    conf.conf.COOKIE_SECRET
  );

  if (!unsignedSession) {
    if (options.throwError) {
      throw new ApiError('Invalid session cookie', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }

  const session = CookieProcessor.deserialize(unsignedSession);

  return await db.query.User.findFirst({
    where: eq(User.id, session.userId)
  });
}

export type SessionUser = Promised<ReturnType<typeof getSessionUser>>;
