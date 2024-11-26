import { Config } from '@/common/config';
import { Dependency } from '@/common/di';
import type { DbTransaction } from '@/common/interfaces/db';
import { ApiSchemaValidator } from '@/common/schema/validator';
import { PasswordProcessor } from '@/common/utils/password';
import { User } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { inject, injectable } from 'inversify';
import type { CreateUserRequestBody } from '../../users/schema/create-user-request.schema';
import { createUserRequestSchema } from '../../users/schema/create-user-request.schema';

@injectable()
@Dependency()
export class UserAuthSetup {
  // #region Properties (3)

  @inject(Config) private conf: Config;
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  @inject(ApiSchemaValidator) private validator: ApiSchemaValidator;

  // #endregion Properties (3)

  // #region Public Methods (1)

  public async setup(transaction: DbTransaction) {
    const { DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD } =
      this.conf.conf;

    const newUser = this.validator.validate<CreateUserRequestBody>(
      createUserRequestSchema,
      {
        email: DEFAULT_USER_EMAIL,
        first_name: DEFAULT_USER_NAME,
        last_name: DEFAULT_USER_NAME,
        password: DEFAULT_USER_PASSWORD,
        username: DEFAULT_USER_NAME,
        gender: 'Other'
      }
    );

    const [exisingUser] = await transaction
      .select()
      .from(User)
      .where(
        or(
          eq(User.email, newUser.email),
          eq(User.username, newUser.username),
          eq(User.is_admin, true)
        )
      )
      .execute();
    const password = await this.passwordProcessor.hash(newUser.password);

    if (!exisingUser) {
      await transaction.insert(User).values({
        ...newUser,
        password: password,
        is_active: true,
        is_admin: true,
        is_email_verified: true
      });
    }
  }

  // #endregion Public Methods (1)
}
