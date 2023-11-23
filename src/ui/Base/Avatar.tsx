import { useState } from 'react';
import Image from 'next/image';

type AvatarSize = 'small' | 'medium' | 'large';
interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
}

const FALLBACK_IMAGE_SRC = '/icons/avatar.svg';

const getSizeClasses = (size: AvatarSize) => {
  switch (size) {
    case 'small': {
      return 'w-[2rem] h-[2rem]';
    }
    case 'medium': {
      return 'w-[3.2rem] h-[3.2rem]';
    }
    case 'large': {
      return 'w-[7rem] h-[7rem]';
    }
  }
};

const Avatar = ({ name, src, size = 'medium' }: AvatarProps) => {
  const [image, setImage] = useState(src ?? FALLBACK_IMAGE_SRC);
  const sizeClass = getSizeClasses(size);

  const setFallbackImage = () => setImage(FALLBACK_IMAGE_SRC);

  return (
    <span
      className={`relative inline-block rounded-full bg-white ${sizeClass}`}
    >
      <Image
        alt={name || 'avatar'}
        src={image}
        fill
        className={`rounded-full object-cover ${sizeClass}`}
        onError={setFallbackImage}
      />
    </span>
  );
};

export default Avatar;
