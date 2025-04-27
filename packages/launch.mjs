#!/usr/bin/env node

// launch.mjs - Smart launch script with service dependencies
import { spawn } from 'child_process';
import { createInterface } from 'readline';
import chalk from 'chalk';

const services = {
  backend: {
    name: 'Backend API',
    command: 'pnpm',
    args: ['run', 'dev:backend'],
    color: 'green',
    readyPattern: /Server started on port/,
    dependsOn: []
  },
  admin: {
    name: 'Admin UI',
    command: 'pnpm',
    args: ['run', 'dev:admin'],
    color: 'blue',
    readyPattern: /ready in \d+ms/,
    dependsOn: ['backend']
  },
  web: {
    name: 'Web UI',
    command: 'pnpm',
    args: ['run', 'dev:web'],
    color: 'magenta',
    readyPattern: /ready in \d+ms/,
    dependsOn: ['backend']
  }
};

// Track which services are ready
const serviceStatus = {};
Object.keys(services).forEach(service => {
  serviceStatus[service] = false;
});

// Start a service
function startService(serviceName) {
  const service = services[serviceName];
  console.log(chalk.bold(`Starting ${service.name}...`));
  
  // Check if this service has dependencies
  if (service.dependsOn.length > 0) {
    const unreadyDeps = service.dependsOn.filter(dep => !serviceStatus[dep]);
    if (unreadyDeps.length > 0) {
      console.log(chalk[service.color](`Waiting for dependencies: ${unreadyDeps.join(', ')}...`));
      // We'll check dependencies again when other services signal ready
      return;
    }
  }

  const proc = spawn(service.command, service.args, { 
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  // Handle output
  const rl = createInterface({ input: proc.stdout });
  const errRl = createInterface({ input: proc.stderr });
  
  rl.on('line', (line) => {
    console.log(chalk[service.color](`[${service.name}] ${line}`));
    
    // Check if service is ready based on its ready pattern
    if (service.readyPattern.test(line)) {
      console.log(chalk.bold[service.color](`${service.name} is ready!`));
      serviceStatus[serviceName] = true;
      
      // Check if any waiting services can now start
      Object.keys(services).forEach(svcName => {
        const svc = services[svcName];
        if (!serviceStatus[svcName] && svc.dependsOn.every(dep => serviceStatus[dep])) {
          startService(svcName);
        }
      });
    }
  });
  
  errRl.on('line', (line) => {
    console.log(chalk.red(`[${service.name} ERROR] ${line}`));
  });

  proc.on('close', (code) => {
    console.log(chalk.yellow(`${service.name} process exited with code ${code}`));
    serviceStatus[serviceName] = false;
  });
}

// Start services without dependencies first
Object.keys(services)
  .filter(svcName => services[svcName].dependsOn.length === 0)
  .forEach(startService);

console.log(chalk.bold.yellow('Press Ctrl+C to stop all services'));
