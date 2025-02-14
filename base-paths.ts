import path from 'node:path';

const BASE_DIR = path.dirname(path.resolve(process.cwd(), 'package.json'));
const SCRIPTS_DIR = path.resolve(BASE_DIR, 'scripts');
export const folders = {
  BASE_DIR,
  SCRIPTS_DIR,
};
