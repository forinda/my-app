import { injectable } from 'inversify';
import type {
  AuthorityType,
  AuthorityModuleTypes
} from '../constants/persmission-table';
import { permissionTable } from '../constants/persmission-table';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';
import { Dependency } from '../di';

@injectable()
@Dependency()
export class AuthorityManager {
  generatePermissions() {
    const permissions = Object.keys(permissionTable).map((key) => ({
      module: key as AuthorityModuleTypes,
      description: `${key} module`,
      permissions: Array.from((permissionTable as any)[key]).map((perm) => ({
        name: `${key}:${perm}` as AuthorityType,
        module: key,
        description: `User can ${perm} (${key})`
      }))
    }));

    return permissions;
  }
  private extractAuthority(authority: string | string[]) {
    return typeof authority !== 'undefined'
      ? ((Array.isArray(authority)
          ? authority
          : [authority]) as AuthorityType[])
      : [];
  }
  validateAuthority(authority?: any) {
    if (!(typeof authority === 'string') && typeof authority !== 'undefined') {
      throw new ApiError('Invalid authory provided', HttpStatus.BAD_REQUEST, {
        type: typeof authority
      });
    }

    const flattennedPermisions = this.generatePermissions().flatMap((role) =>
      role.permissions.map((perm) => perm.name)
    );
    const extractedAuthority = this.extractAuthority(authority!);

    if (extractedAuthority.length < 1) {
      return extractedAuthority;
    }

    extractedAuthority.every((auth) => {
      const valid = flattennedPermisions.includes(auth);

      if (!valid) {
        throw new ApiError(
          'Invalid user permission provided',
          HttpStatus.BAD_REQUEST
        );
      }
    });

    return extractedAuthority;
  }
}
