const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/e-portfolio',
  basePath: '/e-portfolio',
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
