import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { fileURLToPath } from "node:url";

const input = {
  main: fileURLToPath(new URL("./index.html", import.meta.url)),
  misiune: fileURLToPath(new URL("./misiune.html", import.meta.url)),
  activitati: fileURLToPath(new URL("./activitati.html", import.meta.url)),
  resurse: fileURLToPath(new URL("./resurse.html", import.meta.url)),
  comunitate: fileURLToPath(new URL("./comunitate.html", import.meta.url)),
  contact: fileURLToPath(new URL("./contact.html", import.meta.url)),
};

const API_PROXY_TARGET =
  process.env.VITE_API_PROXY_TARGET || "http://localhost:8787";

export default defineConfig({
  plugins: [
    mdx(), // 👉 MDX loader (must come BEFORE react())
    react(),
  ],
  build: {
    rollupOptions: {
      input,
    },
  },
  server: {
    proxy: {
      "/api": {
        target: API_PROXY_TARGET,
        changeOrigin: true,
      },
    },
  },
});
