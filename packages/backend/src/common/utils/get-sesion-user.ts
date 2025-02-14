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
  const cookie = request.cookies[conf.conf.SESSION_COOKIE_NAME];

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

  const session = CookieProcessor.deserialize<{
    uid: string;
  }>(unsignedSession);

  const user = await db
    .select({
      id: User.id,
      first_name: User.first_name,
      last_name: User.last_name,
      email: User.email,
      gender: User.gender,
      username: User.username,
      is_active: User.is_active,
      phone_number: User.phone_number,
      is_email_verified: User.is_email_verified,
      is_admin: User.is_admin,
      avatar: User.avatar
    })
    .from(User)
    .where(eq(User.uuid, session.uid))
    .execute();

  return user[0];
}

export type SessionUser = Promised<ReturnType<typeof getSessionUser>>;
