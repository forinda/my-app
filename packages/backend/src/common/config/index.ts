import { config as envConf } from 'dotenv';
import type { EnvType } from '../schema/env.schema';
import { envSchema } from '../schema/env.schema';
import { injectable } from 'inversify';
import { Dependency } from '../di';
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
}
