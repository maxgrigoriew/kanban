import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';

export default defineConfig({
  build: {
    rollupOptions: {},
  },
  plugins: [
    vue(),
    createSvgPlugin({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    open: true,
    host: 'localhost',
    port: 8000,
  },
});
