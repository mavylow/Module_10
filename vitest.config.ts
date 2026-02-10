import {defineConfig} from "vitest/config"
import path from 'path';

export default defineConfig({
    test: {
        environment: "jsdom"
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@components': path.resolve(__dirname, './src/components'),
          '@pages': path.resolve(__dirname, './src/pages'),
          '@utils': path.resolve(__dirname, './src/utils'),
        }
      }
})