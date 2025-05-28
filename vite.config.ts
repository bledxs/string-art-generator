import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde .env
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react({
        // Optimizaciones de React
        babel: {
          plugins: [
            // Solo en producción, remover console.logs
            ...(process.env.NODE_ENV === 'production'
              ? [
                  [
                    'babel-plugin-transform-remove-console',
                    { exclude: ['error', 'warn'] },
                  ],
                ]
              : []),
          ],
        },
      }),
      tailwindcss(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            // Hacer disponible VITE_ADSENSE_CLIENT_ID para index.html
            // process.env.VITE_ADSENSE_CLIENT_ID funciona si Vite lo ha cargado
            // o si está definido en el entorno de build.
            // Usar env.VITE_ADSENSE_CLIENT_ID es más explícito con loadEnv.
            VITE_ADSENSE_CLIENT_ID: env.VITE_ADSENSE_CLIENT_ID,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    // Optimizaciones de build SIN compresión problemática
    build: {
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar vendor libraries para mejor caching
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['lucide-react'],
            'utils-vendor': ['react-easy-crop'],
          },
          // Optimizar nombres de chunks
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId
                  .split('/')
                  .pop()
                  ?.replace(/\.(ts|tsx)$/, '') || 'chunk'
              : 'chunk';
            return `assets/${facadeModuleId}-[hash].js`;
          },
        },
      },
      // Configuraciones de optimización
      sourcemap: false, // Sin sourcemaps en producción
      reportCompressedSize: false, // Acelerar build
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096, // Inline assets pequeños como base64
    },
    // Servidor de desarrollo sin headers problemáticos
    server: {
      host: true,
      port: 3000,
      // ❌ SIN HEADERS DE COMPRESIÓN EN DESARROLLO
    },
    // Preview SIN headers problemáticos
    preview: {
      port: 4173,
      host: true,
      // ❌ REMOVER HEADERS DE CONTENT-ENCODING
      // headers: {
      //   'Content-Encoding': 'gzip' // <-- ESTO CAUSABA EL ERROR
      // }
    },
    // Optimizar dependencias
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react', 'react-easy-crop'],
    },
  };
});
