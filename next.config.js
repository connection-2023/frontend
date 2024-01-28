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
