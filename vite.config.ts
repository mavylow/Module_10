import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    if (
      id.includes("/react/") ||
      id.includes("/react-dom/") ||
      id.includes("/react-router-dom/") ||
      id.includes("/react-redux/") ||
      id.includes("/@reduxjs/toolkit/")
    ) {
      return "vendor-react";
    }

    if (
      id.includes("/@mui/") ||
      id.includes("/@emotion/")
    ) {
      return "vendor-mui";
    }

    if (
      id.includes("/@tanstack/") ||
      id.includes("/axios/") ||
      id.includes("/mobx/")
    ) {
      return "vendor-utils";
    }

    if (
      id.includes("/formik/") ||
      id.includes("/yup/") ||
      id.includes("/zod/") ||
      id.includes("/react-hook-form/") ||
      id.includes("/@hookform/")
    ) {
      return "vendor-forms";
    }

    if (id.includes("/@sidekick-monorepo/")) {
      return "vendor-backend-mock";
    }

    return "vendor-other";
  }
  return undefined;
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: { manualChunks: manualChunks },
      treeshake: {
        preset: 'recommended',

      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@svg": path.resolve(__dirname, "./src/svg"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@providers": path.resolve(__dirname, "./src/providers"),
    },
  },
});
