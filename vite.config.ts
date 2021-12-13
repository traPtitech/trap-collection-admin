import vue from '@vitejs/plugin-vue'
import https from 'https'
import path from 'path'
import brotli from 'rollup-plugin-brotli'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

const keepAliveAgent = new https.Agent({ keepAlive: true })
const DEV_SERVER_PROXY_HOST = 'https://collection-dev.tokyotech.org'

export default defineConfig({
  plugins: [vue(), brotli(), WindiCSS()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '/src').replace(/\\/g, '/')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: DEV_SERVER_PROXY_HOST,
        changeOrigin: true,
        agent: keepAliveAgent
      }
    }
  }
})
