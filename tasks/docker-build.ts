import { exec } from 'shelljs';
import { folders } from '../base-paths';
import chalk from 'chalk';
export function docker_build_client_web_app(cb: Function) {
  console.warn(
    chalk.yellow('[docker-build-web]: Running docker build for web'),
  );
  const { BASE_DIR } = folders;

  const command = `cd ${BASE_DIR} && chmod +x ./scripts/build-web.sh && ./scripts/build-web.sh`;
  console.warn(`[Gulp-docker-build-web]: Building web app image`);
  exec(command);
  cb();
}

export function docker_build_admin_web_app(cb: Function) {
  console.warn(
    chalk.yellow('[docker-build-admin]: Running docker build for admin'),
  );
  const { BASE_DIR } = folders;

  const command = `cd ${BASE_DIR} && chmod +x ./scripts/build-admin.sh && ./scripts/build-admin.sh`;
  console.warn(`[Gulp-docker-build-admin]: Building admin app image`);
  exec(command);
  cb();
}

export function docker_build_api_app(cb: Function) {
  console.warn(
    chalk.yellow('[docker-build-api]: Running docker build for api'),
  );
  const { BASE_DIR } = folders;

  const command = `cd ${BASE_DIR} && chmod +x ./scripts/build-backend.sh && ./scripts/build-backend.sh`;
  console.warn(`[Gulp-docker-build-api]: Building api app image`);
  exec(command);
  cb();
}
