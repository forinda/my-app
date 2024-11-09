import { ApiServerSetup } from '@/app';
import { Config } from '@/common/config';
import { Dependency } from '@/common/di';
import { ApiErrorRouteHandler } from '@/common/errors/base-error-handlers';
import type { Application } from 'express';
import express from 'express';
import { createServer } from 'http';
import { inject, injectable } from 'inversify';

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

    const message = `Server listening on http://localhost:${this.config.get(
      'PORT'
    )}`;

    console.log(message);
  }

  public run() {
    const server = createServer(this.bootstrap());

    server.listen(this.config.get('PORT'), this.onListening);
  }
}
