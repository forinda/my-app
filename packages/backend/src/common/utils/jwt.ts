import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Config } from '../config';
import { ApiError } from '../errors/base';
import { Dependency } from '../di';

type JwtUserPayload = {
  id: number;
  tokeType: 'access' | 'refresh';
};

@injectable()
@Dependency()
export class JWT {
  @inject(Config) private readonly config: Config;

  constructor() {}

  signAccessToken(payload: JwtUserPayload) {
    if (payload.tokeType !== 'access') {
      throw new ApiError('Invalid token type');
    }

    return jwt.sign(payload, this.config.conf.AC_JWT_ACCESS_SECRET, {
      expiresIn: this.config.conf.AC_JWT_ACCESS_EXPIRES_IN
    });
  }

  signRefreshToken(payload: JwtUserPayload) {
    if (payload.tokeType !== 'refresh') {
      throw new ApiError('Invalid token type');
    }

    return jwt.sign(payload, this.config.conf.AC_JWT_ACCESS_SECRET, {
      expiresIn: this.config.conf.REF_JWT_EXPIRES_IN
    });
  }

  verifyAccessToken(token: string) {
    const payload = jwt.verify(
      token,
      this.config.conf.AC_JWT_ACCESS_SECRET,
      {}
    ) as JwtUserPayload;

    if (payload.tokeType !== 'access') {
      throw new ApiError('Invalid token type');
    }

    return payload;
  }

  verifyRefreshToken(token: string) {
    const payload = jwt.verify(
      token,
      this.config.conf.AC_JWT_ACCESS_SECRET
    ) as JwtUserPayload;

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

  signTokens(payload: Pick<JwtUserPayload, 'id'>) {
    return {
      access_token: this.signAccessToken({
        ...payload,
        tokeType: 'access'
      }),
      refresh_token: this.signRefreshToken({
        ...payload,
        tokeType: 'refresh'
      })
    };
  }
}
