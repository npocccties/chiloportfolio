/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV == 'production'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  output: isProduction ? "portfolio" : "",
  assetPrefix: isProduction ? "/portfolio" : ""
};

module.exports = nextConfig;
