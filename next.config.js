/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  // basePath: "/portfolio",
  // distDir: "dist"
  output: "portfolio",
  assetPrefix: "/portfolio"
};

module.exports = nextConfig;
