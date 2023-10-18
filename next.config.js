const isProd = process.env.NODE_ENV === 'production'
const baseUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? baseUrl : undefined,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
