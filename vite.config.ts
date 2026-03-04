import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": [
            "react",
            "react-dom",
            "react-router-dom",
            "react-redux",
            "@reduxjs/toolkit",
          ],
          "vendor-mui": [
            "@mui/material",
            "@mui/system",
          ],
          "vendor-utils": ["@tanstack/react-query", "axios"],
          "vendor-forms": [
            "formik",
            "yup",
            "react-hook-form"
          ],
          "vendor-backend-mock": ["@sidekick-monorepo/internship-backend"],
        },
      },
      treeshake: {
        preset: "recommended",
      },
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
