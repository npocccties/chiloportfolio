/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV == 'production'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  // basePath: "/portfolio",
  // distDir: "dist"
  output: isDevelopment ? "portfolio" : "",
  assetPrefix: isDevelopment ? "/portfolio" : ""
};

module.exports = nextConfig;
