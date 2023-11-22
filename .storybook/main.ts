import type { StorybookConfig } from '@storybook/nextjs';
import { RuleSetRule } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],

  typescript: {
    reactDocgen: false,
  },

  webpackFinal: async (config) => {
    const rules = config?.module?.rules as RuleSetRule[];
    const imageRule = rules.find(
      (rule) => rule?.test instanceof RegExp && rule.test.test('.svg'),
    );
    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }
    rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.alias['/images/receipt-background.svg'] = path.resolve(
      __dirname,
      '../public/images/receipt-background.svg',
    );

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    );

    return config;
  },

  docs: {
    autodocs: 'tag',
  },

  env: (config) => ({
    ...config,
    NEXT_PUBLIC_NAVER_MAP_CLIENT_ID:
      process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || '',
  }),
};

export default config;
