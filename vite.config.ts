import vue from '@vitejs/plugin-vue'
import https from 'https'
import path from 'path'
import { defineConfig } from 'vite'
import compress from 'vite-plugin-compress'
import WindiCSS from 'vite-plugin-windicss'

const keepAliveAgent = new https.Agent({ keepAlive: true })
const DEV_SERVER_PROXY_HOST = 'https://collection-dev.tokyotech.org'

export default defineConfig({
  plugins: [
    vue(),
    compress(), // 現状brotli圧縮したやつしか配信しない
    WindiCSS()
  ],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '/src').replace(/\\/g, '/')
    }
  },
  server: {
    open: true,
    proxy: {
      '/api/*': {
        target: DEV_SERVER_PROXY_HOST,
        changeOrigin: true,
        agent: keepAliveAgent
      }
    }
  }
})
