import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Enable minification with esbuild (faster alternative to terser)
        minify: 'esbuild',
        esbuild: {
          drop: ['console', 'debugger'], // Remove console.log and debugger in production
        },
        // Optimize chunk size
        rollupOptions: {
          output: {
            manualChunks: {
              // Vendor chunks
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'animation-vendor': ['framer-motion'],
              'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
            },
          },
        },
        // Improve chunk size warnings
        chunkSizeWarningLimit: 1000,
        // Enable source maps for production debugging (optional)
        sourcemap: false,
        // CSS code splitting
        cssCodeSplit: true,
        // Asset inlining threshold (in bytes)
        assetsInlineLimit: 4096,
        // Target modern browsers for smaller bundle
        target: 'es2020',
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
      },
    };
});
