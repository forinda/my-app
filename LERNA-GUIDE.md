# Lerna Monorepo Guide

This project uses [Lerna](https://lerna.js.org/) with [Nx](https://nx.dev/) for efficient monorepo management. Below are common commands and workflows to help you get started.

## Getting Started

After cloning the repository, install dependencies:

```bash
pnpm install
```

## Common Commands

### Development

Run all packages in development mode:
```bash
pnpm run dev:all
```

Run specific packages:
```bash
# Run only backend
pnpm run backend:dev

# Run only web client
pnpm run web:dev

# Run only admin client
pnpm run admin:dev
```

### Building

Build all packages:
```bash
pnpm run build:all
```

Build specific packages:
```bash
pnpm run backend:build
pnpm run web:build
pnpm run admin:build
```

### Testing

Run all tests:
```bash
pnpm run test:all:lerna
```

### Working with Changes

Build only packages affected by your changes (compared to main branch):
```bash
pnpm run affected:build
```

Test only packages affected by your changes:
```bash
pnpm run affected:test
```

Lint only packages affected by your changes:
```bash
pnpm run affected:lint
```

### Visualizing the Project

See the dependency graph of your project:
```bash
pnpm run nx:graph
```

### Caching

Clear the Nx cache:
```bash
pnpm run nx:reset
```

Connect to Nx Cloud for distributed caching (optional):
```bash
pnpm run connect-nx-cloud
```

## Benefits of Using Lerna with Nx

1. **Task Orchestration**: Commands run in the correct order based on dependencies
2. **Caching**: Tasks that haven't changed don't need to run again, saving time
3. **Efficient Builds**: Only rebuild what's necessary with the `--since` flag
4. **Clear Dependency Graph**: Visualize relationships between packages

## Legacy Commands

The project still maintains the legacy Gulp tasks, which can be accessed via:
```bash
pnpm run gulp
```
