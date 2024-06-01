import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [preact()],
  build: mode === 'lib' ? {
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["preact", "@preact/signals"],
    },
    outDir: 'dist',
    minify: true,
  } : {
    outDir: 'example/dist'
  },
  server: {
    port: 8000,
  },
}));
