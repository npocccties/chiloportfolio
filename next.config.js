/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/e-portfolio/', // assetPrefix requires the trailing slash
  basePath: '/e-portfolio',
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
