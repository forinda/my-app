import path from 'path';
import { config as envConf } from 'dotenv';
import findRoot from 'find-root';

envConf();

const BASE_DIR = findRoot(__dirname);

const resolvePath = (base: string, ...paths: string[]) => {
  return path.resolve(path.join(base, ...paths));
};

const LOGS_DIR = resolvePath(BASE_DIR, 'logs');
export const PATHS = { BASE_DIR, resolvePath, LOGS_DIR };
