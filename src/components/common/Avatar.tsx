'use client';

import { Children, ReactNode, useState } from 'react';

import Image from '@/components/common/Image';

type AvatarSize = 'small' | 'medium' | 'large';
interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  border?: boolean;
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

const Avatar = ({ name, src, size = 'medium', border }: AvatarProps) => {
  const [image, setImage] = useState(src ?? FALLBACK_IMAGE_SRC);

  const { sizeClasses, sizeProps } = getAvatarSize(size);
  const borderClass = border ? 'border-[0.15rem]' : 'border-none';

  const setFallbackImage = () => setImage(FALLBACK_IMAGE_SRC);

  return (
    <span
      className={`relative inline-block rounded-full border-white bg-white ${sizeClasses} ${borderClass}`}
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

const AvatarGroup = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="mr-[0.75rem] flex flex-row-reverse items-center justify-end">
      {Children.toArray(children).map((avatar, idx) => (
        <span key={idx} className={`-me-[0.75rem] leading-none`}>
          {avatar}
        </span>
      ))}
    </div>
  );
};

export { AvatarGroup };
