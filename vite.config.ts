import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    // When deploying to Cloudflare Pages, we want to ensure the build doesn't fail on small type errors
    // since we are using 'vite build' which does a transpile-only build by default if tsc is not invoked.
  },
  define: {
    // This allows the client-side code to access process.env.API_KEY
    // You MUST set the API_KEY environment variable in Cloudflare Pages settings.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});