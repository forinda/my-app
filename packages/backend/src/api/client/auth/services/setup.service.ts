import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { AuthModule, AuthPermission } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { AuthorityManager } from '@/common/utils/permission-generator';

@injectable()
@Dependency()
export class SetupAuthService {
  @inject(AuthorityManager) private auth: AuthorityManager;

  @TransactionalService()
  async setup(props?: TransactionContext) {
    const { transaction } = props!;
    const permissions = this.auth.generatePermissions();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, sysModule] of permissions.entries()) {
      const { module: moduleName, permissions, description } = sysModule;
      let [dbModule] = (await transaction!
        .select()
        .from(AuthModule)
        .where(eq(AuthModule.name, moduleName))
        .execute())!;

      if (!dbModule) {
        dbModule = (await transaction
          ?.insert(AuthModule)
          .values({
            name: moduleName,
            description
          })
          .returning())![0];
      }

      for (const perm of permissions) {
        const { name, description } = perm;
        const [dbPerm] = (await transaction!
          .select()
          .from(AuthPermission)
          .where(eq(AuthPermission.name, name))
          .execute())!;

        if (!dbPerm) {
          await transaction!
            .insert(AuthPermission)
            .values({
              name,
              description,
              module_id: dbModule.id
            })
            .execute();
        }
      }
    }
    // throw new Error('Not implemented');

    return createHttpSuccessResponse(
      {},
      HttpStatus.OK,
      'Setup ran successfully'
    );
  }
}
