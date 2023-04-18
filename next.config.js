const baseURL = process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/service-api/:url*',
        destination: `${baseURL}/api/:url*`,
      },
      {
        source: '/kakaobook/:kakaoBookId',
        destination: 'http://t1.daumcdn.net/lbook/image/:kakaoBookId',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bookarchive',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search1.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
