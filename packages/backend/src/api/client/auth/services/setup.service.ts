import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { ModulePermissionSetup } from '../utils/module-permission-setup';
import { UserAuthSetup } from '../utils/user-auth-setup';

@injectable()
@Dependency()
export class SetupAuthService {
  @inject(ModulePermissionSetup)
  private modulePermissionSetup: ModulePermissionSetup;
  @inject(UserAuthSetup)
  private userAuthSetup: UserAuthSetup;

  @TransactionalService()
  async setup(props?: TransactionContext) {
    const { transaction } = props!;

    await this.modulePermissionSetup.setup(transaction!);
    await this.userAuthSetup.setup(transaction!);

    return createHttpSuccessResponse(
      {},
      HttpStatus.OK,
      'Setup ran successfully'
    );
  }
}
