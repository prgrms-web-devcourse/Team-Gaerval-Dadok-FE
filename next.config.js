/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bookarchive/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
