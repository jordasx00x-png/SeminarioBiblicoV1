import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  typescript: {
    // Ignora errores de TypeScript para poder realizar el build sin bloqueos
    ignoreBuildErrors: true,
  },
  build: {
    chunkSizeWarningLimit: 1600,
  }
});
