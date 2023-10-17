import Image from 'next/image';

import { IconAvatar } from '@public/icons';

type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
}

const getSizeClasses = (size: AvatarSize) => {
  switch (size) {
    case 'small': {
      return 'w-[2rem] h-[2rem]';
    }
    case 'medium': {
      return 'w-[3.5rem] h-[3.5rem]';
    }
    case 'large': {
      return 'w-[7rem] h-[7rem]';
    }
  }
};

const Avatar = ({ name, src, size = 'medium' }: AvatarProps) => {
  const sizeClass = getSizeClasses(size);

  return (
    <span
      className={`relative inline-block rounded-full bg-white ${sizeClass}`}
    >
      {src ? (
        <Image
          alt={name || 'avatar'}
          src={src}
          fill
          className={`rounded-full object-cover ${sizeClass}`}
        />
      ) : (
        <IconAvatar />
      )}
    </span>
  );
};

export default Avatar;
