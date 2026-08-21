import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Serves the standalone Kynyx Devs landing page (public/kynyx-devs.html) at
// /landing-page during local dev, mirroring the /landing-page rewrite in
// vercel.json used for production.
function kynyxDevsLandingPage(): Plugin {
  return {
    name: 'kynyx-devs-landing-page',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/landing-page' || req.url?.startsWith('/landing-page?')) {
          const filePath = path.resolve(__dirname, 'public/kynyx-devs.html');
          res.setHeader('Content-Type', 'text/html');
          res.end(fs.readFileSync(filePath));
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), kynyxDevsLandingPage()],
  server: {
    port: 5173,
    host: true,
    // Allow the live-preview host (and any dev host) to reach the dev server
    allowedHosts: true,
    proxy: {
      // Forward API calls to the Express server during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
