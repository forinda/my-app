import { Dependency } from '@/common/di';
import type { DbTransaction } from '@/common/interfaces/db';
import { AppLogger } from '@/common/logger';
import { AuthorityManager } from '@/common/utils/permission-generator';
import { AuthModule, AuthPermission } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'inversify';

@injectable()
@Dependency()
export class ModulePermissionSetup {
  // #region Properties (1)

  @inject(AuthorityManager) private auth: AuthorityManager;
  @inject(AppLogger) private logger: AppLogger;

  // #endregion Properties (1)

  // #region Public Methods (1)

  public async setup(transaction: DbTransaction) {
    this.logger.info('[API]', 'Setting up module permissions');
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
  }

  // #endregion Public Methods (1)
}
