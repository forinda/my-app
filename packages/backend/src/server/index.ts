import { ApiServerSetup } from '@/app';
import { Config } from '@/common/config';
import { Dependency } from '@/common/di';
import { ApiErrorRouteHandler } from '@/common/errors/route-err-handler';
import type { Application } from 'express';
import express from 'express';
import { createServer } from 'http';
import { inject, injectable } from 'inversify';
import chalk from 'chalk';
import { baseLogger } from '@/common/logger';
@injectable()
@Dependency()
export class ApiServer {
  app: Application;
  _name: string;

  @inject(ApiServerSetup) private readonly apiServerSetup: ApiServerSetup;
  @inject(ApiErrorRouteHandler)
  private readonly apiErrorRouteHandler: ApiErrorRouteHandler;

  @inject(Config) private readonly config: Config;

  constructor() {
    this.app = express();
    this._name = 'ApiServer';
  }

  set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  bootstrap(name: string = 'default') {
    this._name = name;
    this.apiServerSetup.setupExpressApp(this.app);
    this.apiErrorRouteHandler.plugin({ app: this.app });

    return this.app;
  }

  private onListening() {
    // console.log({ config: this.config });
    const listeningMessage = chalk.yellow(
      `Listening on http://localhost:${this.config.conf.PORT}`
    );

    const message = `(${this.config.conf.NODE_ENV}):${listeningMessage} ${this.config.conf.NODE_ENV === 'development' ? '🚀' : '🔒'}`;

    baseLogger.info('[API]', message);
  }

  public run() {
    const server = createServer(this.bootstrap());

    server.listen(this.config.conf.PORT, this.onListening);
  }
}
