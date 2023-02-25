import { Avatar, Box } from '@chakra-ui/react';
import Link from 'next/link';

interface UserAvatarProps {
  src: string;
  name: string;
  href: string;
  w?: string;
  h?: string;
}

const UserAvatar = ({
  src,
  name,
  href,
  w = '3.2rem',
  h = '3.2rem',
}: UserAvatarProps) => {
  return (
    <Box w={w} h={h}>
      <Link href={href}>
        <Avatar name={name} src={src} w="100%" h="100%" />
      </Link>
    </Box>
  );
};

export default UserAvatar;
