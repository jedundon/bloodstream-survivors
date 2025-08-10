import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    base: isProduction ? '/bloodstream-survivors/' : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@/assets': resolve(__dirname, 'assets'),
        '@/data': resolve(__dirname, 'assets/data')
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          manualChunks: {
            phaser: ['phaser']
          },
          assetFileNames: 'assets/[name].[ext]'
        }
      },
      target: 'es2020'
    },
    server: {
      port: 5173,
      host: true,
      open: true
    },
    assetsInclude: ['**/*.json', '**/*.atlas'],
    define: {
      __DEV__: !isProduction
    }
  };
});