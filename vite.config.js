import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    sourcemap: false, // enable only when debugging production
    target: "esnext",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  },

  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@sections": "/src/sections",
      "@store": "/src/store",
      "@api": "/src/api",
      "@assets": "/src/assets",
    },
  },
});
