import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",

  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    sourcemap: false,
    target: "es2018",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
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
