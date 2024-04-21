import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from "url";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
      },
    },
  },
  base: "/tfl-vite/"
})
