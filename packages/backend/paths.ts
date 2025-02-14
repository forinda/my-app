import path from 'path';
import { config as envConf } from 'dotenv';
import findRoot from 'find-root';

const BASE_DIR = findRoot(__dirname);
const ENV_FILE = path.resolve(path.join(BASE_DIR, '../../.env'));
envConf({ path: ENV_FILE });
const resolvePath = (base: string, ...paths: string[]) => {
  return path.resolve(path.join(base, ...paths));
};

const LOGS_DIR = resolvePath(BASE_DIR, 'logs');
export const PATHS = { BASE_DIR, ENV_FILE, resolvePath, LOGS_DIR };
