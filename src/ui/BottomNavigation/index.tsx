'use client';

import { Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NavigationItem from './NavigationItem';

const navigationItems = [
  {
    iconName: 'bookshelf',
    label: '북카이브',
    href: '/bookarchive/',
  },
  {
    iconName: 'hashtag',
    label: '도서 카테고리',
    href: '/book/',
  },
  {
    iconName: 'book',
    label: '독서모임',
    href: '/meeting/',
  },
  {
    iconName: 'user',
    label: '내 프로필',
    href: '/profile/me/',
  },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <Flex
      justify="space-between"
      bg="white.900"
      px="3.2rem"
      py="1.6rem"
      pos="fixed"
      bottom={0}
      w="100%"
      maxW="43rem"
      maxH="9rem"
    >
      {navigationItems.map(({ iconName, label, href }) => (
        <NavigationItem
          key={href}
          iconName={iconName}
          label={label}
          href={href}
          isActive={pathname?.indexOf(href) === 0}
        />
      ))}
    </Flex>
  );
};

export default BottomNavigation;
