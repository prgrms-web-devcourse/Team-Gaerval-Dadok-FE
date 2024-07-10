const baseURL = process.env.NEXT_PUBLIC_API_URL;
const aladinURL = process.env.ALADIN_OPEN_API_URI;
const ALADIN_API_KEY = process.env.ALADIN_OPEN_API_TTBKEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/aladin-api',
        has: [{ type: 'query', key: 'QueryType', value: '(?<QueryType>.*)' }],
        destination: `${aladinURL}/api/ItemList.aspx?ttbkey=${ALADIN_API_KEY}&QueryType=:QueryType&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101`,
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
        hostname: '*.kakaocdn.net',
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
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
