export default defineConfig({
  base: "/", // ← ADD THIS

  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    sourcemap: false,
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
