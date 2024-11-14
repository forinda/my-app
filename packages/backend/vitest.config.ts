import 'reflect-metadata';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
export default defineConfig({
  test: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    environment: 'node',
    setupFiles: ['./src/test/setup.ts']
    // include: ['src/**/*.{.spec,.test}.ts']
  }
});
