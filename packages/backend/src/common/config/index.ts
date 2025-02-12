import { config as envConf } from 'dotenv';
import type { EnvType } from '../schema/env.schema';
import { envSchema } from '../schema/env.schema';
import { injectable } from 'inversify';
import { Dependency } from '../di';
import { PATHS } from './../../../paths';
envConf();

@injectable()
@Dependency()
export class Config {
  private _conf: EnvType;
  constructor() {
    this._conf = envSchema.parse(process.env);
  }

  get conf() {
    return this._conf;
  }

  get paths() {
    return PATHS;
  }

  get cookieOpts() {
    const ONE_DAY = 60 * 60 * 24 * 1000;
    const ONE_WEEK = ONE_DAY * 7;

    return {
      secure: this.conf.COOKIE_SECURE,
      domain: this.conf.COOKIE_DOMAIN,
      sameSite: this.conf.COOKIE_SAME_SITE,
      httpOnly: this.conf.COOKIE_HTTP_ONLY,
      maxAge: ONE_DAY.toString(),
      rememberMeExpires: ONE_WEEK.toString()
    };
  }
}
