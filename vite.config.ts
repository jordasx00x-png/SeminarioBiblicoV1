import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    hmr: false,
    watch: null
  },
  build: {
    chunkSizeWarningLimit: 2000,
  }
});
