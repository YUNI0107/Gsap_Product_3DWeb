import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import mkcert from 'vite-plugin-mkcert'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true, // 啟用 HTTPS
    host: 'localhost', // 設定 hostname
    port: 8080, // 設定端口號
  },
  plugins: [
    react(),
    mkcert(),
    glsl(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
})
