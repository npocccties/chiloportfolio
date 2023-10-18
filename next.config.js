const urlPrefix = `/e-portfolio`

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: urlPrefix,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
