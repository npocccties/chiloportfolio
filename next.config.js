/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV == 'production'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  // basePath: "/portfolio",
  // distDir: "dist"
  output: isProduction ? "portfolio" : "",
  assetPrefix: isProduction ? "/portfolio" : ""
};

module.exports = nextConfig;
