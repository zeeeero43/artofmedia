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
          legalComments: 'none', // Remove license comments
        },
        // Optimize chunk size
        rollupOptions: {
          output: {
            manualChunks: {
              // Vendor chunks - split for better caching
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'animation-vendor': ['framer-motion'],
              'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
            },
            // Optimize chunk file names for better caching
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
          },
        },
        // Improve chunk size warnings
        chunkSizeWarningLimit: 1000,
        // Enable source maps for production debugging (optional)
        sourcemap: false,
        // CSS code splitting
        cssCodeSplit: true,
        // Asset inlining threshold (in bytes) - inline small assets
        assetsInlineLimit: 4096,
        // Target modern browsers for smaller bundle
        target: 'es2020',
        // Reduce bundle size
        reportCompressedSize: false,
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
      },
    };
});
