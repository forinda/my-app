import { ApiServerSetup } from '@/app';
import { Config } from '@/common/config';
import { Dependency } from '@/common/di';
import { ApiErrorRouteHandler } from '@/common/errors/base-error-handlers';
import type { Application } from 'express';
import express from 'express';
import { createServer } from 'http';
import { inject, injectable } from 'inversify';
import chalk from 'chalk';
import moment from 'moment';
@injectable()
@Dependency()
export class ApiServer {
  app: Application;
  name: string;

  @inject(ApiServerSetup) private readonly apiServerSetup: ApiServerSetup;
  @inject(ApiErrorRouteHandler)
  private readonly apiErrorRouteHandler: ApiErrorRouteHandler;

  @inject(Config) private readonly config: Config;

  constructor(name: string = 'ApiServer') {
    this.app = express();
    this.name = name;
  }

  bootstrap(name: string = 'default') {
    this.name = name;
    this.apiServerSetup.setupExpressApp(this.app);
    this.apiErrorRouteHandler.plugin({ app: this.app });

    return this.app;
  }

  private onListening() {
    // console.log({ config: this.config });
    const listeningMessage = chalk.yellow(
      `Listening on http://localhost:${this.config.conf.PORT}`
    );
    const envMessage = `App started on: ${
      this.config.conf.NODE_ENV === 'development'
        ? chalk.green(this.config.conf.NODE_ENV)
        : chalk.red(this.config.conf.NODE_ENV)
    }`;
    const message = `\nServer started at ${moment().format('LLL')} ${
      this.config.conf.NODE_ENV === 'development' ? '🚀' : '🔒'
    }\n${listeningMessage}\n${envMessage}
    `;

    console.log(message);
  }

  public run() {
    const server = createServer(this.bootstrap());

    server.listen(this.config.conf.PORT, this.onListening);
  }
}
