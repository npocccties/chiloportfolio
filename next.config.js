const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? '../' : undefined,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
