import { PropsWithChildren, useMemo } from 'react';

type Size = 'small' | 'medium' | 'large';
type ColorScheme = 'main' | 'main-light' | 'grey' | 'red';
type FontWeight = 'thin' | 'normal' | 'bold';

type BadgeProps = PropsWithChildren<{
  size?: Size;
  colorScheme?: ColorScheme;
  fontWeight?: FontWeight;
  isFilled?: boolean;
}>;

const getSizeClasses = (size: Size) => {
  switch (size) {
    case 'small': {
      return 'h-[1.8rem] text-2xs';
    }
    case 'medium': {
      return 'h-[1.9rem] text-xs';
    }
    case 'large': {
      return 'h-[2.1rem] text-xs';
    }
  }
};

const getSchemeClasses = (colorScheme: ColorScheme, isFilled: boolean) => {
  switch (colorScheme) {
    case 'main': {
      return isFilled
        ? 'border-main-900 bg-main-900 text-white'
        : 'border-main-900 text-main-900';
    }
    case 'main-light': {
      return isFilled
        ? 'border-main-600 bg-main-600 text-white'
        : 'border-main-600 text-main-600';
    }
    case 'grey': {
      return isFilled
        ? 'border-black-100 bg-black-100 text-black-500'
        : 'border-black-500 text-black-500';
    }
    case 'red': {
      return isFilled
        ? 'border-warning-800 bg-warning-800 text-white'
        : 'border-warning-800 text-warning-800';
    }
  }
};

const getFontWeightClasses = (fontWeight: FontWeight) => {
  switch (fontWeight) {
    case 'thin': {
      return 'font-thin';
    }
    case 'normal': {
      return 'font-normal';
    }
    case 'bold': {
      return 'font-bold';
    }
  }
};

const Badge = ({
  size = 'medium',
  colorScheme = 'main',
  fontWeight = 'normal',
  isFilled = true,
  children,
  ...props
}: BadgeProps) => {
  const computedClasses = useMemo(() => {
    const sizeClass = getSizeClasses(size);
    const schemeClass = getSchemeClasses(colorScheme, isFilled);
    const fontWeightClass = getFontWeightClasses(fontWeight);

    return [sizeClass, schemeClass, fontWeightClass].join(' ');
  }, [size, colorScheme, isFilled, fontWeight]);

  return (
    <div
      className={`m-0 flex w-fit items-center justify-center gap-[0.4rem] rounded-[0.5rem] border-[0.1rem] px-[0.6rem] py-[0.25rem] ${computedClasses}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
