import type { ApiRequestContext } from '../interfaces/controller';
import type { AuthorityType } from '../constants/persmission-table';
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

      const user = await getSessionUser(req, { throwError: true });

      args[0].user = user;
      if (user?.is_admin) {
        return originalMethod.apply(this, args);
      }
      // const authManager = di.resolve(AuthorityManager);
      // const permissions = authManager.validateAuthority(authority);
      // const userPermissions = user.user_roles.flatMap(
      //   ({ role: { role_permissions } }) =>
      //     role_permissions.map(({ permission: { name } }) => name)
      // );

      // if (permissions.length < 1) {
      //   return originalMethod.apply(this, args);
      // }

      // const hasAccess = permissions.every((permission) =>
      //   userPermissions.includes(permission)
      // );

      // if (!hasAccess) {
      //   throw new ApiError(
      //     'You are not authorized to see this resource',
      //     HttpStatus.FORBIDDEN
      //   );
      // }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
