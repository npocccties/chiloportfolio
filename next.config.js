/** @type {import('next').NextConfig} */

// const isProduction = process.env.NODE_ENV == 'production'
// const isProduction = true

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  // basePath: isProduction ? "/portfolio" : "",
  //assetPrefix: isProduction ? "/portfolio" : "",
  output: "portfolio",
  async rewrites() {
    return [
      {
        source: "/portfolio",
        destination: "/",
      },
    ]
  },
};

module.exports = nextConfig;
