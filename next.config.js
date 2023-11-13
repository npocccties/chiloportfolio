/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  basePath: "/portfolio",
  assetPrefix: "/portfolio",
  async rewrites() {
    return [
      {
        source: "/portfolio/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/portfolio/images/:query*",
        destination: '/_next/image/:query*'
      },
      {
        source: "/portfolio/_next/:path*",
        destination: "/_next/:path*",
      },
    ]
  }  };

module.exports = nextConfig;
