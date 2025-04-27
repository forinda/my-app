#!/usr/bin/env node

// deploy.mjs - Smart deployment script for independent service deployment
import { spawn } from 'child_process';
import { createInterface } from 'readline';
import chalk from 'chalk';
import { existsSync } from 'fs';
import path from 'path';

const services = {
  backend: {
    name: 'Backend API',
    composePath: './deploy/backend/docker-compose-backend.yml',
    color: 'green',
  },
  admin: {
    name: 'Admin UI',
    composePath: './deploy/admin/docker-compose-admin.yml',
    color: 'blue',
  },
  web: {
    name: 'Web UI',
    composePath: './deploy/web/docker-compose-web.yml',
    color: 'magenta',
  },
};

// Command line argument parsing
const args = process.argv.slice(2);
const selectedServices =
  args.length > 0
    ? args.filter((arg) => Object.keys(services).includes(arg))
    : Object.keys(services);

if (args.includes('--help') || args.includes('-h')) {
  console.log(chalk.bold('Deployment Script Help'));
  console.log('Usage: node deploy.mjs [options] [services]');
  console.log('\nOptions:');
  console.log('  --help, -h     Show this help message');
  console.log('  --build, -b    Rebuild images before starting containers');
  console.log('  --down, -d     Stop and remove containers');
  console.log('\nServices:');
  Object.keys(services).forEach((svc) => {
    console.log(`  ${svc.padEnd(10)} ${services[svc].name}`);
  });
  console.log('\nExamples:');
  console.log('  node deploy.mjs               # Deploy all services');
  console.log('  node deploy.mjs backend       # Deploy only backend');
  console.log('  node deploy.mjs web admin     # Deploy web and admin');
  console.log('  node deploy.mjs --build web   # Rebuild and deploy web');
  console.log('  node deploy.mjs --down        # Stop all services');
  process.exit(0);
}

// Check if services exist
if (selectedServices.length === 0) {
  console.log(
    chalk.red(
      'No valid services specified. Use --help to see available services.'
    )
  );
  process.exit(1);
}

// Check if docker-compose files exist
for (const serviceName of selectedServices) {
  const composePath = services[serviceName].composePath;
  if (!existsSync(composePath)) {
    console.log(
      chalk.red(`Error: Docker Compose file not found: ${composePath}`)
    );
    process.exit(1);
  }
}

// Determine action
const shouldBuild = args.includes('--build') || args.includes('-b');
const shouldDown = args.includes('--down') || args.includes('-d');

// Execute docker-compose command for a service
function runDockerCompose(serviceName, action) {
  const service = services[serviceName];
  const composeFile = service.composePath;

  let command, cmdArgs;

  if (action === 'up') {
    console.log(chalk[service.color](`Starting ${service.name}...`));
    command = 'docker';
    cmdArgs = [
      'compose',
      '-f',
      composeFile,
      'up',
      shouldBuild ? '--build' : '',
      '-d',
    ];
  } else if (action === 'down') {
    console.log(chalk[service.color](`Stopping ${service.name}...`));
    command = 'docker';
    cmdArgs = ['compose', '-f', composeFile, 'down'];
  } else if (action === 'build') {
    console.log(chalk[service.color](`Building ${service.name}...`));
    command = 'docker';
    cmdArgs = ['compose', '-f', composeFile, 'build'];
  }

  // Filter out empty strings
  cmdArgs = cmdArgs.filter((arg) => arg !== '');

  return new Promise((resolve, reject) => {
    const proc = spawn(command, cmdArgs, {
      shell: true,
      stdio: 'inherit',
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(
          chalk[service.color](
            `${action === 'down' ? 'Stopped' : 'Deployed'} ${
              service.name
            } successfully`
          )
        );
        resolve();
      } else {
        console.log(
          chalk.red(`${service.name} ${action} failed with code ${code}`)
        );
        reject(new Error(`${service.name} ${action} failed with code ${code}`));
      }
    });
  });
}

// Create network if it doesn't exist
async function ensureNetworkExists() {
  console.log(chalk.yellow('Ensuring shared network exists...'));
  const proc = spawn('docker', ['network', 'create', 'shared_network'], {
    shell: true,
    stdio: 'pipe',
  });

  return new Promise((resolve) => {
    proc.on('close', () => {
      resolve();
    });
  });
}

// Main execution
async function main() {
  try {
    console.log(chalk.bold.yellow('Payroll System Docker Deployment'));
    console.log(
      chalk.yellow(
        `Mode: ${
          shouldDown
            ? 'Stopping'
            : shouldBuild
            ? 'Building and Starting'
            : 'Starting'
        }`
      )
    );
    console.log(chalk.yellow(`Services: ${selectedServices.join(', ')}`));

    if (!shouldDown) {
      await ensureNetworkExists();
    }

    for (const serviceName of selectedServices) {
      if (shouldDown) {
        await runDockerCompose(serviceName, 'down');
      } else {
        await runDockerCompose(serviceName, shouldBuild ? 'build' : 'up');
      }
    }

    console.log(chalk.bold.green('Deployment completed successfully!'));
  } catch (error) {
    console.log(chalk.red('Deployment failed:', error.message));
    process.exit(1);
  }
}

main();
