import { inject } from 'inversify';
import jwt from 'jsonwebtoken';
import { Config } from '../config';
import { ApiError } from '../errors/base';

type JwtUserPayload = {
  id: string;
  tokeType: 'access' | 'refresh';
};

export class JWT {
  private _access_secret: string;
  private _refresh_secret: string;
  private _aceess_expiresIn: string;
  private _refresh_expiresIn: string;

  @inject(Config) private readonly config: Config;

  constructor() {
    this._access_secret = this.config.conf.AC_JWT_ACCESS_SECRET;
    this._refresh_secret = this.config.conf.REF_JWT_SECRET;
    this._aceess_expiresIn = this.config.conf.AC_JWT_ACCESS_EXPIRES_IN;
    this._refresh_expiresIn = this.config.conf.REF_JWT_EXPIRES_IN;
  }

  signAccessToken(payload: JwtUserPayload) {
    if (payload.tokeType !== 'access') {
      throw new ApiError('Invalid token type');
    }

    return jwt.sign(payload, this._access_secret, {
      expiresIn: this._aceess_expiresIn
    });
  }

  signRefreshToken(payload: JwtUserPayload) {
    if (payload.tokeType !== 'refresh') {
      throw new ApiError('Invalid token type');
    }

    return jwt.sign(payload, this._refresh_secret, {
      expiresIn: this._refresh_expiresIn
    });
  }

  verifyAccessToken(token: string) {
    const payload = jwt.verify(token, this._access_secret) as JwtUserPayload;

    if (payload.tokeType !== 'access') {
      throw new ApiError('Invalid token type');
    }

    return payload;
  }

  verifyRefreshToken(token: string) {
    const payload = jwt.verify(token, this._refresh_secret) as JwtUserPayload;

    if (payload.tokeType !== 'refresh') {
      throw new ApiError('Invalid token type');
    }

    return payload;
  }

  decodeAccessToken(token: string) {
    return jwt.decode(token) as JwtUserPayload;
  }

  decodeRefreshToken(token: string) {
    return jwt.decode(token) as JwtUserPayload;
  }

  signTokens(payload: JwtUserPayload) {
    return {
      accessToken: this.signAccessToken({
        ...payload,
        tokeType: 'access'
      }),
      refreshToken: this.signRefreshToken({
        ...payload,
        tokeType: 'refresh'
      })
    };
  }
}
