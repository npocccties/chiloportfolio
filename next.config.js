/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  basePath: "/portfolio",
  assetPrefix: "/portfolio",
  output: "portfolio",
};

module.exports = nextConfig;
