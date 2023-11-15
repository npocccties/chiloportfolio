/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  basePath: "/portfolio",
  // distDir: "dist"
};

module.exports = nextConfig;
