import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "category-images",
      generateBundle() {
        for (const name of ["cinema", "geographie", "histoire"]) {
          this.emitFile({
            type: "asset",
            fileName: `img/${name}.jpg`,
            source: readFileSync(new URL(`./img/${name}.jpg`, import.meta.url)),
          });
        }
      },
    },
  ],
  server: {
    proxy: { "/api": { target: "http://127.0.0.1:8000", changeOrigin: true } },
  },
});
