# Payroll System Monorepo Guide

This project uses a monorepo architecture powered by Lerna and Nx to efficiently manage multiple packages. This document explains the setup, benefits, and common workflows.

## Architecture Overview

The monorepo contains three main packages:
- `backend` - The Node.js backend API
- `admin` (React) - The admin dashboard interface
- `web` (Vue) - The user-facing web interface

## Key Benefits of Our Setup

### 1. Task Orchestration with Lerna
- Commands run in the correct order based on dependencies
- Packages that depend on other packages are built after their dependencies
- Parallel execution when possible with `--parallel` flag

### 2. Build Caching with Nx
- Tasks that haven't changed don't need to run again
- Local cache saves rebuilding unchanged packages
- Significant time savings on subsequent builds

### 3. Smart Change Detection
- Only rebuild what's changed with `--since=main` flag
- Perfect for CI/CD pipelines to optimize build times
- Detects file changes to determine what needs to be rebuilt

### 4. Dependency Graph Visualization
- See relationships between packages with `pnpm run graph`
- Visual representation of your project's architecture
- Helps understand build order and dependencies

### 5. Smart Dev Mode
- Launch all services in the correct order with `pnpm run dev:smart`
- Services start only after their dependencies are ready
- Colorized output makes it easy to monitor different services

## Common Commands

### Development

```bash
# Start all packages in development mode (parallel)
pnpm run dev:all

# Start all packages with dependency resolution (smart)
pnpm run dev:smart

# Start specific packages
pnpm run dev:backend
pnpm run dev:admin
pnpm run dev:web
```

### Building

```bash
# Build all packages (in dependency order)
pnpm run build:all

# Build specific packages
pnpm run build:backend
pnpm run build:admin
pnpm run build:web

# Build only affected packages (changed since main branch)
pnpm run affected:build
```

### Testing

```bash
# Test all packages
pnpm run test:all

# Test specific packages
pnpm run test:backend
pnpm run test:admin
pnpm run test:web

# Test only affected packages
pnpm run affected:test
```

### Tools and Visualization

```bash
# View package dependency relationships
pnpm run deps:view

# Visual graph of package dependencies
pnpm run graph

# Reset the build cache (if you're experiencing issues)
pnpm run reset-cache
```

## Working with Lerna & Nx

### Understanding Task Caching

Tasks are cached based on input files. If the source files haven't changed, the cached output is used instead of re-running the task. This significantly speeds up your development and CI workflows.

### Customizing Package Detection

Package detection is configured in `lerna.json` in the `packages` array. By default, it looks for packages in the `packages/*` directory.

### Configuring Task Dependencies

Task dependencies are defined in `nx.json` in the `targetDefaults` section. This tells Lerna/Nx which tasks depend on other tasks to ensure correct execution order.

## Legacy Commands

For compatibility, the old Gulp-based workflows are still available:

```bash
# List all available Gulp tasks
pnpm run gulp

# Run specific Gulp commands
pnpm run gc:build
pnpm run gc:admin-dev
pnpm run gc:web-dev
pnpm run gc:backend-dev
```

## Advanced Features

### CI/CD Integration

For CI pipelines, use the `affected:*` commands to only build, test, or lint what changed in a PR:

```bash
pnpm run affected:build
pnpm run affected:test
pnpm run affected:lint
```

### Remote Caching (Optional)

For larger teams, connect to Nx Cloud for distributed caching:

```bash
pnpm run connect-nx-cloud
```
