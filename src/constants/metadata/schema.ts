export const navigationSchemaItems = [
  {
    '@type': 'SiteNavigationElement',
    position: 1,
    name: '북카이브',
    description:
      '같은 직군인 유저들의 책장과 인기 도서를 추천받고 인사이트를 넓혀보세요',
    url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/bookarchive`,
  },
  {
    '@type': 'SiteNavigationElement',
    position: 2,
    name: '도서검색',
    description:
      '평소에 궁금했거나 함께 이야기 나누고 싶은 도서를 검색해보세요',
    url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/book/search`,
  },
  {
    '@type': 'SiteNavigationElement',
    position: 3,
    name: '독서모임',
    description:
      '읽고 싶은 책을 선정하고 모임에 참여하여 멤버들과 이야기를 나눠보세요',
    url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/group`,
  },
  {
    '@type': 'SiteNavigationElement',
    position: 4,
    name: '내프로필',
    description: '내 책장을 관리하고 참여한 독서 모임들을 확인해보세요',
    url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/profile/me`,
  },
];
