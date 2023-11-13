/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: "/portfolio",
        destination: "/",
      },
    ]
  }
};

module.exports = nextConfig;
