import type { AuthorityType } from '../constants/persmission-table';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';
import type { ApiRequestContext } from '../interfaces/controller';
import { getSessionUser } from './get-sesion-user';
export type LoginAuthorityOption = AuthorityType | AuthorityType[] | boolean;

export function controllerAuth(context: ApiRequestContext) {
  // const { req } = args[0] as ApiRequestContext;
  // const user = await getSessionUser(req, { throwError: true });
  // args[0].user = user;
  // if (user!.sessions.length > 0) {
  //   args[0].organization_id = user!.sessions[0].auth_session_organization_id;
  // }
  // if (user?.is_admin) {
  //   return originalMethod.apply(this, args);
  // }
  return async function (authority?: LoginAuthorityOption) {
    console.log(
      '[DEBUG] controllerAuth',
      typeof authority === 'boolean' && authority
        ? 'simple-auth'
        : Array.isArray(authority)
          ? authority.join(',')
          : authority
    );

    const user = await getSessionUser(context.req, { throwError: true });

    if (user) {
      if (user.sessions.length > 0) {
        context.user = user;
        context.current_organization_id =
          user.sessions[0].auth_session_organization_id!;
      }
    } else {
      throw new ApiError('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  };
}
