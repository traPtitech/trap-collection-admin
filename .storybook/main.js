const { mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      resolve: {
        alias: {
          '/@': path.resolve(__dirname, '/src').replace(/\\/g, '/')
        }
      },
    });
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite"
  },
  features: {
    storyStoreV7: true
  }
}
