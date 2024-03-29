/** @type {import("next").NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['img.freepik.com', 'connection-bucket.s3.amazonaws.com'],
  },
  headers: async () => {
    return [
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, private',
          },
        ],
        source: '/:path*',
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/register',
  //       destination: '/',
  //       permanent: true,
  //     },
  //     {
  //       source: '/welcome/:nickname',
  //       destination: '/',
  //       permanent: true,
  //     },
  //     {
  //       source: '/upload-profile',
  //       destination: '/',
  //       permanent: true,
  //     },
  //     {
  //       source: '/error',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
});

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'connection',
    project: 'javascript-nextjs',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
