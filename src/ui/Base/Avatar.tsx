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
      return ['w-[2rem] h-[2rem]', { width: 20, height: 20 }] as const;
    }
    case 'medium': {
      return ['w-[3.2rem] h-[3.2rem]', { width: 32, height: 32 }] as const;
    }
    case 'large': {
      return ['w-[7rem] h-[7rem]', { width: 70, height: 70 }] as const;
    }
  }
};

const Avatar = ({ name, src, size = 'medium' }: AvatarProps) => {
  const [image, setImage] = useState(src ?? FALLBACK_IMAGE_SRC);
  const [sizeClass, sizeProps] = getAvatarSize(size);

  const setFallbackImage = () => setImage(FALLBACK_IMAGE_SRC);

  return (
    <span
      className={`relative inline-block rounded-full bg-white ${sizeClass}`}
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
