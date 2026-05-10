import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'src/app/core'),
      '@shared': resolve(__dirname, 'src/app/shared'),
      '@features': resolve(__dirname, 'src/app/features'),
      '@layouts': resolve(__dirname, 'src/app/layouts'),
      '@theme': resolve(__dirname, 'src/styles'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/setup-vitest.ts'],
  },
});
