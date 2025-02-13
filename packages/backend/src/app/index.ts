import { ApiV1 } from '@/api/v1';
import { Dependency } from '@/common/di';
import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { Config } from '@/common/config';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

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
    app.use(cookieParser(this.config.conf.COOKIE_SECRET));
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        req.headers['Access-Control-Allow-Origin'] = '*';
        req.headers['Access-Control-Allow-Headers'] = 'Content-Type';
        req.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
        next();
      },
      cors({
        origin: this.config.conf.NODE_ENV === 'development' ? '*' : [],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Access-Control-Allow-Origin',
          'Access-Control-Allow-Headers'
        ]
        // preflightContinue: false,
      })
    );
    app.use(helmet());
    app.use(morgan('dev'));
    this.apiV1.setup(app);
  }
}
