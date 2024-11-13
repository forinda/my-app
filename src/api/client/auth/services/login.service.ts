import { inject, injectable } from 'inversify';
import type { LoginUserRequestBody } from '../schema/login-request.schema';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { ApiError } from '@/common/errors/base';

@injectable()
@Dependency()
export class LoginUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;

  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<LoginUserRequestBody>) {
    // console.log({data});

    const { password, emailOrUsername } = data;

    const loginType = emailOrUsername.includes('@') ? 'email' : 'username';
    const db_users = await transaction
      ?.select()
      .from(User)
      .where(
        loginType === 'email'
          ? eq(User.email, emailOrUsername)
          : eq(User.email, emailOrUsername)
      );

    if (db_users!.length < 1) {
      throw new ApiError(' No user data found');
    }
    const user = db_users![0];
    const passwordMatch = await this.passwordProcessor.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new ApiError('Invalid login credentials');
    }

    console.log({ user: db_users });

    // Confirm user details
    // Create login session
    // generate token
    // .console.log({ data, transaction });

    return createHttpSuccessResponse(
      {},
      HttpStatus.OK,
      'User login successful'
    );
  }
}
