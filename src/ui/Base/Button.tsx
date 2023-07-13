import { ComponentPropsWithoutRef, useMemo } from 'react';

type Size = 'small' | 'medium' | 'large' | 'full';
type Theme = 'primary' | 'primary-light' | 'warning' | 'light' | 'kakao';

interface ButtonProps {
  size?: Size;
  theme?: Theme;
  fill?: boolean;
  fullRadius?: boolean;
  label?: string;
}

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

const getThemeClasses = (theme: Theme, isFill: boolean) => {
  switch (theme) {
    case 'primary': {
      return isFill
        ? 'border-main-900 bg-main-900 text-white'
        : 'border-main-900 text-main-900';
    }
    case 'primary-light': {
      return 'border-transparent bg-main-600/[.18] text-main-900';
    }
    case 'warning': {
      return isFill
        ? 'border-warning-800 bg-warning-800 text-white '
        : 'border-warning-800 text-warning-800';
    }
    case 'light': {
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
  'cursor-pointer border-[0.1rem] font-bold leading-none inline-block';

const Button = ({
  size = 'medium',
  theme = 'primary',
  fill = true,
  fullRadius = false,
  label,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<'button'>) => {
  const computedClasses = useMemo(() => {
    const sizeClass = getSizeClasses(size);
    const themeClass = getThemeClasses(theme, fill);
    const roundedClass = fullRadius ? 'rounded-full' : 'rounded-[5px]';

    return `${sizeClass} ${themeClass} ${roundedClass}`;
  }, [size, theme, fill, fullRadius]);

  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
