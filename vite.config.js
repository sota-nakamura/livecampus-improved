import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/lcu-web': {
        target: 'https://lc.kaiyodai.ac.jp',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            if (proxyRes.headers.location) {
              const host = req.headers.host || 'localhost:5173';
              proxyRes.headers.location = proxyRes.headers.location.replace(
                /^https:\/\/lc\.kaiyodai\.ac\.jp/,
                `http://${host}`
              );
            }
            if (proxyRes.headers['set-cookie']) {
              proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map((cookie) =>
                cookie.replace(/;\s*secure/gi, '')
              );
            }
          });
        },
      },
    },
  },
})
