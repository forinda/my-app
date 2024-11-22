import { User } from '@/db/schema';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';
import type { ApiRequestContext } from '../interfaces/controller';
import { JWT } from '../utils/jwt';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { di } from '../di';
import type { AuthorityType } from '../constants/persmission-table';

export function LoginRequired(authority?: AuthorityType | AuthorityType[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const { req } = args[0] as ApiRequestContext;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new ApiError(
          'Authorization header is required',
          HttpStatus.UNAUTHORIZED
        );
      }

      const [scheme, headerToken] = (authHeader || '').split(' ') ?? [];
      // console.log('', authHeader);

      // Check for scheme validity
      if (!/^Bearer$/i.test(scheme)) {
        throw new ApiError(
          'Invalid authorization scheme',
          HttpStatus.UNAUTHORIZED
        );
      }

      // Check for token validity
      if (!headerToken) {
        throw new ApiError('Auth Token is required', HttpStatus.UNAUTHORIZED);
      }

      const jWT = di.resolve(JWT);
      // Check for token validity
      const { id: user_id, tokeType } = jWT.verifyAccessToken(headerToken);

      if (tokeType !== 'access') {
        throw new ApiError('Invalid token type', HttpStatus.UNAUTHORIZED);
      }

      const user = await db.query.User.findFirst({
        // .where(eq(User.id, user_id as number)); // .from(User) // }) //   is_email_verified: User.is_email_verified //   is_active: User.is_active, //   email: User.email, //   username: User.username, //   id: User.id, // .select({
        where: eq(User.id, user_id as number),
        columns: {
          id: true,
          username: true,
          email: true,
          is_active: true,
          is_email_verified: true
        },
        with: {
          user_roles: {
            with: {
              role: {
                with: {
                  role_permissions: {
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
      args[0].user = user;

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
