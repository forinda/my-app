import { ApiV1 } from '@/api/v1';
import { Dependency } from '@/common/di';
import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { Config } from '@/common/config';
import morgan from 'morgan';
import helmet from 'helmet';

@injectable()
@Dependency()
export class ApiServerSetup {
  @inject(ApiV1) private readonly apiV1: ApiV1;
  @inject(Config) private readonly config: Config;

  setupExpressApp(app: Application) {
    app.use(express.json({ limit: '100mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.set('trust proxy', 1);
    app.disable('x-powered-by');
    app.use(
      cors({
        origin: this.config.conf.NODE_ENV === 'development' ? '*' : [],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        // preflightContinue: false,
      })
    );
    app.use(helmet());
    app.use(morgan('dev'));
    this.apiV1.setup(app);
  }
}
