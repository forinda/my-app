import shell from 'shelljs';
import chalk from 'chalk';

const scripts = {
  backend: {
    dev: 'pnpm --filter=backend dev',
    build: 'pnpm --filter=backend build',
    start: 'pnpm --filter=backend start',
  },
  web: {
    dev: 'pnpm --filter=web dev',
    build: 'pnpm --filter=web build',
    start: 'pnpm --filter=web start',
  },
  admin: {
    dev: 'pnpm --filter=admin dev',
    build: 'pnpm --filter=admin build',
    start: 'pnpm --filter=admin start',
  },
  shared: {
    dev: 'pnpm --filter=shared dev',
    build: 'pnpm --filter=shared build',
    // start: 'pnpm --filter=shared start',
  },
} as const;

export function runApps(cb: Function) {
  console.warn(chalk.yellow('[run-apps]: Running apps'));
  //  Run with pnpm
  // shell.exec('pnpm run dev:backend && pnpm run dev:web && pnpm run dev:admin');
  shell.exec(
    `${scripts.shared.dev} & ${scripts.backend.dev} & ${scripts.web.dev} & ${scripts.admin.dev}`,
  );
  cb();
}

export function runAdminUI(cb: Function) {
  console.warn(chalk.yellow('[run-admin-ui]: Running admin ui'));
  //  Run with pnpm
  // shell.exec('pnpm run dev:admin');
  shell.exec(scripts.admin.dev);
  cb();
}

export function runWeb(cb: Function) {
  console.warn(chalk.yellow('[run-web]: Running web'));
  //  Run with pnpm
  shell.exec('pnpm run dev:web');
  cb();
}

export function runApi(cb: Function) {
  console.warn(chalk.yellow('[run-api]: Running api'));
  //  Run with pnpm
  // shell.exec('pnpm run dev:backend');
  shell.exec(scripts.backend.dev);
  cb();
}

export function runAllInParallel(cb: Function) {
  console.warn(
    chalk.yellow('[run-all-in-parallel]: Running all apps in parallel'),
  );
  //  Run with pnpm
  // No script for this, so we have to run them in parallel
  // shell.exec('pnpm run dev:backend & pnpm run dev:web & pnpm run dev:admin');
  shell.exec(
    `${scripts.shared.dev} & ${scripts.backend.dev} & ${scripts.web.dev} & ${scripts.admin.dev}`,
  );
  cb();
}

export function buildApps(cb: Function) {
  console.warn(chalk.yellow('[build-apps]: Building apps'));
  //  Run with pnpm
  // shell.exec('pnpm run build:backend && pnpm run build:web && pnpm run build:admin');
  shell.exec(
    `${scripts.backend.build} & ${scripts.web.build} & ${scripts.admin.build}`,
  );
  cb();
}
// export const runApps = series(runApi, runWeb, runAdminUI);
// export const buildApps = series(buildApi, buildWeb, buildAdminUI);
// export const runAllInParallel = series(runApi, runWeb, runAdminUI);
