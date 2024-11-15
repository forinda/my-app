import { inject, injectable } from 'inversify';
import type { LoginUserRequestBody } from '../schema/login-request.schema';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { LoginSession, Token, User } from '@/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { ApiError } from '@/common/errors/base';
import { JWT } from '@/common/utils/jwt';
import { UUID } from '@/common/utils/uuid';
import { LoginEntity } from '../entities/login-entity';

@injectable()
@Dependency()
export class LoginUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  @inject(JWT) private jwt: JWT;
  @inject(UUID) private uuid: UUID;

  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<LoginUserRequestBody>) {
    const BASE_ERROR_MESSAGE = 'Invalid login credentials';

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
      throw new ApiError(BASE_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
    }
    const user = db_users![0];
    const passwordMatch = await this.passwordProcessor.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new ApiError(BASE_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
    }

    if (!user.is_active) {
      throw new ApiError('User account is not active', HttpStatus.BAD_REQUEST);
    }
    // generate token
    const tokens = this.jwt.signTokens({ id: user.id });
    // Create session token
    const token = await transaction
      ?.insert(Token)
      .values({
        user_id: user.id,
        token: tokens.access_token,
        created_by: user.id
      } as InferInsertModel<typeof Token>)
      .returning();

    // Create login session
    const session = await transaction
      ?.insert(LoginSession)
      .values({
        login_ip: data.ip ?? '',
        user_id: user.id,
        session_id: this.uuid.generate(),
        token_id: token![0].id
      } as InferInsertModel<typeof LoginSession>)
      .returning();

    // Update user last login
    await transaction
      ?.update(User)
      .set({
        last_login_at: new Date().toUTCString(),
        last_login_ip: data.ip ?? ''
      })
      .where(eq(User.id, user.id))
      .execute();

    //TODO: Implement session destroy on logout

    return createHttpSuccessResponse(
      {
        tokens,
        user: LoginEntity.createResponseEntity(user),
        session: session![0].session_id
      },
      HttpStatus.OK,
      'User login successful'
    );
  }
}
