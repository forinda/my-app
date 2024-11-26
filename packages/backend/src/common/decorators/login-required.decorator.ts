import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';
import type { ApiRequestContext } from '../interfaces/controller';
import { JWT } from '../utils/jwt';
import { di } from '../di';
import type { AuthorityType } from '../constants/persmission-table';
import { AuthorityManager } from '../utils/permission-generator';
import { getSessionUser } from '../utils/get-sesion-user';

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
      const user = await getSessionUser(user_id!);

      args[0].user = user;
      if (user.is_admin) {
        return originalMethod.apply(this, args);
      }
      const authManager = di.resolve(AuthorityManager);
      const permissions = authManager.validateAuthority(authority);
      const userPermissions = user.user_roles.flatMap(
        ({ role: { role_permissions } }) =>
          role_permissions.map(({ permission: { name } }) => name)
      );

      if (permissions.length < 1) {
        return originalMethod.apply(this, args);
      }

      const hasAccess = permissions.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!hasAccess) {
        throw new ApiError(
          'You are not authorized to see this resource',
          HttpStatus.FORBIDDEN
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
