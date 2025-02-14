import { injectable } from 'inversify';
import { Dependency, di } from '../di';

import type { LoggerInstance } from 'winston';
import winston from 'winston';
import chalk from 'chalk';
import { Config } from '../config';
import path from 'path';
import { FileManager } from '../utils/file-manager';

type LogSchemes = '[API]' | '[HTTP]' | '[FILE_MANAGER]' | '[DB]' | '[AUTH]';

@injectable()
@Dependency()
export class AppLogger {
  private logger: LoggerInstance;
  constructor() {
    this.constructLogger();
  }

  private constructLogger() {
    const config = di.resolve<Config>(Config);
    const fManager = di.resolve<FileManager>(FileManager);

    const logDir = config.paths.LOGS_DIR;

    if (!fManager.doesFolderExist(logDir)) {
      fManager.createFolder(logDir, { recursive: true });
    }
    const fileName = new Date().toISOString().split('T')[0] + '.log';
    const logPath = path.join(logDir, fileName);

    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          handleExceptions: true,
          json: false,
          colorize: true
        }),
        new winston.transports.File({
          filename: logPath,
          depth: 5,
          colorize: false,
          json: true,
          showLevel: true,
          formatter: (options) => {
            const { level, message, timestamp } = options;

            return decodeURIComponent(`${timestamp} ${level}: ${message}`);
          }
        })
      ]
    });
  }

  public info(scheme: LogSchemes, message: string) {
    const msg = `${chalk.blue(scheme)}:${message}`;

    this.logger.info(msg);
  }

  public warn(scheme: LogSchemes, message: string) {
    const msg = `${chalk.yellow(scheme)}:${message}`;

    this.logger.warn(msg);
  }

  public error(scheme: LogSchemes, message: string) {
    const msg = `${chalk.red(scheme)}:${message}`;

    this.logger.error(msg);
  }
}

export const baseLogger = new AppLogger();
