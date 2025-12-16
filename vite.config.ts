import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // Ensure env vars (like API_KEY) are loaded if they are prefixed with VITE_
  // Note: For server-side process.env.API_KEY, you might need replacement or use VITE_API_KEY pattern
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});