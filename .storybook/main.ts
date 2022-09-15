import type { StorybookViteConfig } from '@storybook/builder-vite'
import path from 'path'
import { mergeConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

const commonConfig = {
  plugins: [WindiCSS()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '/src').replace(/\\/g, '/')
    }
  }
}

const storyBookConfig: StorybookViteConfig = {
  async viteFinal(config) {
    return mergeConfig(config, commonConfig)
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  }
}

export default storyBookConfig
