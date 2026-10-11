import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates a browser environment if needed
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Tells Vitest how to read your @/ paths
    },
  },
});
