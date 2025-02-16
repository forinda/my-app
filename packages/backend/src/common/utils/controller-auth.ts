import type { AuthorityType } from '../constants/persmission-table';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';
import type { ApiRequestContext } from '../interfaces/controller';
import { getSessionUser } from './get-sesion-user';
export type LoginAuthorityOption = AuthorityType | AuthorityType[] | boolean;

export function controllerAuth(context: ApiRequestContext, bindOrg = false) {
  return async function (authority?: LoginAuthorityOption) {
    const { req } = context;

    const user = await getSessionUser(req, { throwError: true });

    if (user) {
      if (user.sessions.length > 0) {
        context.user = user;
        context.current_organization_id =
          user.sessions[0].auth_session_organization_id!;
        context.organization_id = user.sessions[0].organization?.id;
        if (bindOrg && user.sessions[0].organization) {
          context.body['organization_id'] = user.sessions[0].organization.id!;
          context.body['current_organization_id'] =
            user.sessions[0].organization.id!;
        }
      }
    } else {
      throw new ApiError('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  };
}
