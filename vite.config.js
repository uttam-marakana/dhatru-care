// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 plugin
  ],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Firebase bundle
            if (id.includes("firebase")) {
              return "firebase";
            }

            // Redux bundle
            if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
              return "redux";
            }

            // React + router bundle
            if (id.includes("react") || id.includes("react-router-dom")) {
              return "vendor";
            }

            // fallback vendor chunk
            return "vendor";
          }
        },
      },
    },
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
