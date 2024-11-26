import { inject, injectable } from 'inversify';
import type { RefreshTokenRequestBody } from '../schema/login-request.schema';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { LoginSession, Token } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ApiError } from '@/common/errors/base';
import { JWT } from '@/common/utils/jwt';
import db from '@/db';

@injectable()
@Dependency()
export class RefreshTokenService {
  @inject(JWT) private jwt: JWT;

  @TransactionalService()
  async refresh({
    data,
    transaction
  }: TransactionContext<RefreshTokenRequestBody>) {
    // Verify the refresh token
    const { refresh_token: refreshToken, session_id: sessionId } = data;

    const { id, tokeType } = this.jwt.verifyRefreshToken(refreshToken);

    if (tokeType !== 'refresh') {
      throw new ApiError('Invalid token type', HttpStatus.UNAUTHORIZED);
    }

    const clientSession = await db.query.LoginSession.findFirst({
      where: eq(LoginSession.session_id, sessionId),
      with: {
        token: {
          columns: {
            access_token: true,
            refresh_token: true,
            id: true
          }
        },
        owner: {
          columns: {
            is_active: true,
            id: true,
            email: true
          }
        }
      }
    });

    if (!clientSession) {
      throw new ApiError('Invalid user session', HttpStatus.UNAUTHORIZED);
    }

    const { token: dbToken, owner } = clientSession;
    // Session has token reference and user reference

    if (owner.id !== id) {
      throw new ApiError('Invalid user session', HttpStatus.UNAUTHORIZED);
    }

    if (!owner.is_active) {
      throw new ApiError('User account is not active', HttpStatus.UNAUTHORIZED);
    }

    // confirm refresh token
    if (dbToken.refresh_token !== refreshToken) {
      throw new ApiError('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    const newToken = this.jwt.signAccessToken({ id, tokeType: 'access' });

    // Update the token
    const updatedToken = await transaction!
      .update(Token)
      .set({ access_token: newToken })
      .where(eq(Token.id, dbToken.id))
      .returning();

    return createHttpSuccessResponse(
      {
        // refresh_token: dbToken.refresh_token,
        access_token: updatedToken![0].access_token
      },
      HttpStatus.OK,
      'Successfully refreshed token'
    );
  }
}
