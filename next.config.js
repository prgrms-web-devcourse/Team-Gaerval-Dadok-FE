const baseURL = process.env.NEXT_PUBLIC_API_URL;

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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:url*',
  //       destination: `${baseURL}/api/:url*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
