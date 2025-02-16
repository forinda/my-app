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

  return await db.query.User.findFirst({
    where: eq(User.uuid, session.uid),
    columns: {
      id: true,
      uuid: true,
      first_name: true,
      last_name: true,
      email: true,
      gender: true,
      username: true,
      is_active: true,
      phone_number: true,
      is_email_verified: true,
      is_admin: true,
      avatar: true
    },
    with: {
      sessions: {
        columns: {
          id: true,
          auth_session_organization_id: true
        },
        with: {
          organization: {
            columns: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
}

export type SessionUser = Promised<ReturnType<typeof getSessionUser>>;
