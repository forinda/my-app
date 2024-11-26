import { eq } from 'drizzle-orm';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';
import { User } from '@/db/schema';
import db from '@/db';
import type { Promised } from '../interfaces/helpers';

export async function getSessionUser(user_id: number) {
  const user = await db.query.User.findFirst({
    where: eq(User.id, user_id as number),
    columns: {
      id: true,
      username: true,
      email: true,
      is_active: true,
      is_email_verified: true,
      is_admin: true
    },
    with: {
      user_roles: {
        columns: {
          user_id: true,
          role_id: true
        },
        with: {
          role: {
            columns: {
              name: true,
              id: true
            },
            with: {
              role_permissions: {
                columns: {
                  role_id: true,
                  permission_id: true
                },
                with: {
                  permission: {
                    columns: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!user) {
    throw new ApiError('Invalid user', HttpStatus.UNAUTHORIZED);
  }

  if (user.is_active === false) {
    throw new ApiError('User is inactive', HttpStatus.UNAUTHORIZED);
  }

  return user;
}

export type SessionUser = Promised<ReturnType<typeof getSessionUser>>;
