import { parallel } from 'gulp';
import { exec } from 'shelljs';
import { folders } from '../base-paths';

export function build_client_ui(cb: Function) {
  const { BASE_DIR } = folders;
  const command = `cd ${BASE_DIR} && pnpm --filter=web build`;
  console.warn(`Running command: ${command}`);
  exec(command);
  cb();
}

export function build_server(cb: Function) {
  const { BASE_DIR } = folders;
  const command = `cd ${BASE_DIR} && pnpm --filter=backend build`;
  console.warn(`Running command: ${command}`);
  exec(command);
  cb();
}

export function build_admin_client(cb: Function) {
  const { BASE_DIR } = folders;
  const command = `cd ${BASE_DIR} && pnpm --filter=admin build`;
  console.warn(`Running command: ${command}`);
  exec(command);
  cb();
}

export const build_apps = parallel(
  build_client_ui,
  build_server,
  build_admin_client,
);
