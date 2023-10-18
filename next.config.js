/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '../',
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
