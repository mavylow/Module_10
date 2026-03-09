import {defineConfig} from "vitest/config"
import path from 'path';

export default defineConfig({
    test: {
      setupFiles: ["./src/tests/setup.tsx"],
        environment: "jsdom"
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@pages': path.resolve(__dirname, './src/pages'),
          '@components': path.resolve(__dirname, './src/components'),
          '@svg': path.resolve(__dirname, './src/svg'),
          '@utils':  path.resolve(__dirname, './src/utils'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@providers': path.resolve(__dirname, './src/providers'),
        }
      }
})