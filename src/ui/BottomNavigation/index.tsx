'use client';

import { Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NavigationItem from './NavigationItem';

const navigationItems = [
  {
    iconName: 'bookshelf',
    label: '북카이브',
    href: '/bookahive',
  },
  {
    iconName: 'hashtag',
    label: '도서 카테고리',
    href: '/book',
  },
  {
    iconName: 'book',
    label: '독서모임',
    href: '/meeting',
  },
  {
    iconName: 'user',
    label: '내 프로필',
    href: '/mypage',
  },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <Flex
      justify="space-between"
      bg="white.900"
      px="4rem"
      py="2rem"
      pos="fixed"
      bottom={0}
      w="100%"
      maxW="43rem"
    >
      {navigationItems.map(({ iconName, label, href }) => (
        <NavigationItem
          key={href}
          iconName={iconName}
          label={label}
          href={href}
          isActive={pathname === href}
        />
      ))}
    </Flex>
  );
};

export default BottomNavigation;
