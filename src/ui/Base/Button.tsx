import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { useMemo } from 'react';

type Size = 'small' | 'medium' | 'large' | 'full';
type ColorScheme = 'main' | 'main-light' | 'warning' | 'grey' | 'kakao';

type ButtonProps = PropsWithChildren<{
  size?: Size;
  colorScheme?: ColorScheme;
  fill?: boolean;
  fullRadius?: boolean;
}> &
  ComponentPropsWithoutRef<'button'>;

const getSizeClasses = (size: Size) => {
  switch (size) {
    case 'small': {
      return 'text-sm px-[1.2rem] py-[0.6rem]';
    }
    case 'medium': {
      return 'text-md px-[1.6rem] py-[0.8rem]';
    }
    case 'large': {
      return 'text-lg px-[2.4rem] py-[1rem]';
    }
    case 'full': {
      return 'text-lg px-[2.4rem] py-[1rem] w-full';
    }
    default: {
      // medium
      return 'text-md px-[1.6rem] py-[0.8rem]';
    }
  }
};

const getSchemeClasses = (theme: ColorScheme, isFill: boolean) => {
  switch (theme) {
    case 'main': {
      return isFill
        ? 'border-main-900 bg-main-900 text-white'
        : 'border-main-900 text-main-900';
    }
    case 'main-light': {
      return 'border-transparent bg-main-600/[.18] text-main-900 font-normal';
    }
    case 'warning': {
      return isFill
        ? 'border-warning-800 bg-warning-800 text-white '
        : 'border-warning-800 text-warning-800';
    }
    case 'grey': {
      return isFill
        ? 'border-black-400 bg-black-400 text-black-500 '
        : 'border-black-400 text-black-500';
    }
    case 'kakao': {
      return 'border-kakao bg-kakao text-kakaotext';
    }
  }
};

const BASE_BUTTON_CLASSES =
  'cursor-pointer border-[0.1rem] leading-none inline-block font-bold';

const Button = ({
  size = 'medium',
  colorScheme = 'main',
  fill = true,
  fullRadius = false,
  children,
  ...props
}: ButtonProps) => {
  const computedClasses = useMemo(() => {
    const sizeClass = getSizeClasses(size);
    const schemeClass = getSchemeClasses(colorScheme, fill);
    const roundedClass = fullRadius ? 'rounded-full' : 'rounded-[5px]';

    return [sizeClass, schemeClass, roundedClass].join(' ');
  }, [size, colorScheme, fill, fullRadius]);

  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
