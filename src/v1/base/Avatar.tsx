import { useState } from 'react';
import Image from 'next/image';

type AvatarSize = 'small' | 'medium' | 'large';
interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
}

const FALLBACK_IMAGE_SRC = '/icons/avatar.svg';

const getAvatarSize = (size: AvatarSize) => {
  switch (size) {
    case 'small': {
      return {
        sizeClasses: 'w-[2rem] h-[2rem]',
        sizeProps: { width: 20, height: 20 },
      } as const;
    }
    case 'medium': {
      return {
        sizeClasses: 'w-[3.2rem] h-[3.2rem]',
        sizeProps: { width: 32, height: 32 },
      } as const;
    }
    case 'large': {
      return {
        sizeClasses: 'w-[7rem] h-[7rem]',
        sizeProps: { width: 70, height: 70 },
      } as const;
    }
  }
};

const Avatar = ({ name, src, size = 'medium' }: AvatarProps) => {
  const [image, setImage] = useState(src ?? FALLBACK_IMAGE_SRC);
  const { sizeClasses, sizeProps } = getAvatarSize(size);

  const setFallbackImage = () => setImage(FALLBACK_IMAGE_SRC);

  return (
    <span
      className={`relative inline-block rounded-full bg-white ${sizeClasses}`}
    >
      <Image
        alt={name || 'avatar'}
        src={image}
        className={`h-full w-full rounded-full object-cover`}
        {...sizeProps}
        onError={setFallbackImage}
      />
    </span>
  );
};

export default Avatar;
