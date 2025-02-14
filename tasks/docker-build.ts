import { exec } from 'shelljs';
import { folders } from '../base-paths';
import chalk from 'chalk';
export function dockerBuildClientWebApp(cb: Function) {
  console.warn(
    chalk.yellow('[docker-build-web]: Running docker build for web'),
  );
  const { BASE_DIR } = folders;

  const command = `cd ${BASE_DIR} && chmod +x ./scripts/build-web.sh && ./scripts/build-web.sh`;
  console.warn(`[Gulp-docker-build-web]: Building web app image`);
  exec(command);
  cb();
}
