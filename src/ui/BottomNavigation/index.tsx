import { useAuth } from '@/hooks/auth';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import LoginBottomSheet from '../LoginBottomSheet';
import NavigationItem from './NavigationItem';

const BottomNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthed } = useAuth();
  const router = useRouter();

  const navigationItems = [
    {
      iconName: 'bookshelf',
      label: '북카이브',
      href: '/bookarchive',
    },
    {
      iconName: 'hashtag',
      label: '도서 검색',
      href: '/book/search',
    },
    {
      iconName: 'book',
      label: '독서 모임',
      href: '/meeting',
    },
    {
      iconName: 'user',
      label: '내 프로필',
      href: '/profile/me',
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        if (isAuthed) return;
        onOpen();
        event.preventDefault();
      },
    },
  ];

  return (
    <>
      <Flex
        justify="space-between"
        bg="white.900"
        px="3.2rem"
        py="1.6rem"
        pos="fixed"
        bottom={0}
        w="100%"
        maxW="43rem"
        borderTopRadius={20}
        boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 10px 1px"
        maxH="9rem"
      >
        {navigationItems.map(({ iconName, label, href, onClick }) => (
          <NavigationItem
            key={href}
            iconName={iconName}
            label={label}
            href={href}
            isActive={router.pathname.indexOf(href) === 0}
            onClick={onClick}
          />
        ))}
      </Flex>
      <LoginBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BottomNavigation;
