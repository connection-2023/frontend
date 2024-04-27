/** @type {import("next").NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
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
};

module.exports = withSentryConfig(
  withBundleAnalyzer(withPWA(nextConfig)),
  {
    silent: true,
    org: 'connection',
    project: 'javascript-nextjs',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
