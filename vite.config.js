import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const input = {
  main: fileURLToPath(new URL("./index.html", import.meta.url)),
  poveste: fileURLToPath(new URL("./poveste.html", import.meta.url)),
  misiune: fileURLToPath(new URL("./misiune.html", import.meta.url)),
  activitati: fileURLToPath(new URL("./activitati.html", import.meta.url)),
  resurse: fileURLToPath(new URL("./resurse.html", import.meta.url)),
  comunitate: fileURLToPath(new URL("./comunitate.html", import.meta.url)),
  contact: fileURLToPath(new URL("./contact.html", import.meta.url)),
};

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    },
  },
});
