/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/portfolio",
  assetPrefix: "/portfolio",
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
