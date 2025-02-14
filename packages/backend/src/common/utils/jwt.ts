import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Config } from '../config';
import { Dependency } from '../di';

/**
 * Defines the structure of a JWT payload.
 */
type JwtPayload = {
  claims: {
    id: string;
    email: string;
    username: string;
  };
  type: 'access' | 'refresh';
};
@injectable()
@Dependency()
export class JWT {
  @inject(Config) private readonly config: Config;

  constructor() {}
  /**
   * Creates an access token with a short expiration time.
   * @param payload - The JWT payload containing user claims and token type.
   * @returns A signed JWT access token.
   */
  createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.config.conf.AC_JWT_ACCESS_SECRET!, {
      expiresIn: '15m'
    });
  }

  /**
   * Creates a refresh token with a longer expiration time.
   * @param payload - The JWT payload containing user claims and token type.
   * @returns A signed JWT refresh token.
   */
  createRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.config.conf.REF_JWT_SECRET!, {
      expiresIn: '7d',
      algorithm: 'HS256'
    });
  }

  /**
   * Verifies the validity of a JWT token.
   * @param token - The JWT token to verify.
   * @param type - The type of token: `"access"` or `"refresh"`.
   * @returns The decoded JWT payload if the token is valid.
   * @throws An error if the token is invalid or expired.
   */
  verifyToken(token: string, type: 'access' | 'refresh'): JwtPayload {
    return jwt.verify(
      token,
      type === 'access'
        ? process.env.ACCESS_TOKEN_SECRET!
        : process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload;
  }

  /**
   * Generates both an access token and a refresh token for a given user.
   * @param payload - The user claims containing `id`, `email`, and `username`.
   * @returns An object containing both access and refresh tokens.
   */
  generateTokens(payload: Pick<JwtPayload, 'claims'>['claims']): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.createAccessToken({
      claims: payload,
      type: 'access'
    });
    const refreshToken = this.createRefreshToken({
      claims: payload,
      type: 'refresh'
    });

    return { accessToken, refreshToken };
  }
}
