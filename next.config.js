const baseURL = process.env.NEXT_PUBLIC_API_URL;
const aladinURL = process.env.ALADIN_OPEN_API_URI;

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
        source: '/aladin-api/:url*',
        destination: `${aladinURL}/api/:url*`,
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
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
