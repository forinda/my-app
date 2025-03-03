// const { series } = require('gulp');
export { dockerBuildClientWebApp as docker_build_client_web } from './tasks/docker-build';
export {
  runAllInParallel as run_all_in_parallel,
  runApi as run_api,
  runApps as run_apps,
  runWeb as run_web,
  runAdminUI as run_admin_ui,
  buildApps as build_,
} from './tasks/run-apps';
export { build_apps } from './tasks/build-apps';
