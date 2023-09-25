import type { StorybookConfig } from '@storybook/nextjs';
import { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
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

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

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
