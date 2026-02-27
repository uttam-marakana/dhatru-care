// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← Tailwind v4 plugin (no tailwind.config.js needed)
  ],

  // Good defaults for a larger application
  server: {
    port: 5173,
    open: true,
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          redux: ["@reduxjs/toolkit", "react-redux"],
        },
      },
    },
  },

  // Helps when you have many aliases later
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
