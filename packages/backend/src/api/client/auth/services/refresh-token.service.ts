import { inject, injectable } from 'inversify';
import type {
  LoginUserRequestBody,
  RefreshTokenRequestBody
} from '../schema/login-request.schema';
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
  @inject(JWT) private jwt: JWT;

  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<RefreshTokenRequestBody>) {
    // Verify the refresh token
    const { refreshToken, sessionId } = data;

    const { id, tokeType } = this.jwt.verifyRefreshToken(refreshToken);

    if (tokeType !== 'refresh') {
      throw new ApiError('Invalid token type', HttpStatus.UNAUTHORIZED);
    }

    const user = await transaction!
      .select()
      .from(User)
      .where(eq(User.id, id as number));

    if (user.length < 1) {
      throw new ApiError('Invalid user', HttpStatus.UNAUTHORIZED);
    }

    const session = await transaction!
      .select()
      .from(LoginSession)
      .where(eq(LoginSession.session_id, sessionId));

    if (session.length < 1) {
      throw new ApiError('Invalid session', HttpStatus.UNAUTHORIZED);
    }

    const existingSession = session[0];

    if (existingSession.user_id !== id) {
      throw new ApiError('Invalid session', HttpStatus.UNAUTHORIZED);
    }

    // Generate new tokens
    const { access_token } = this.jwt.signTokens({ id: user[0].id });

    return createHttpSuccessResponse(
      {
        access_token,
        session: session![0].session_id
      },
      HttpStatus.OK,
      'Successfully refreshed token'
    );
  }
}
