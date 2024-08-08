import { useMemo } from 'react';

type Direction = 'row' | 'column';

type StickyFooterProps = {
  children?: React.ReactNode;
  direction?: Direction;
  className?: string;
};

const getDirectionClass = (direction: Direction) => {
  switch (direction) {
    case 'row': {
      return 'flex-row';
    }
    case 'column': {
      return 'flex-col';
    }
  }
};

const BASE_STICKY_FOOTER_CLASSES =
  'fixed bottom-0 left-0 right-0 z-10 mx-auto flex w-full max-w-[43rem] gap-[0.8rem] bg-white px-[2.0rem] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[1.5rem]';

const StickyFooter = ({
  children,
  direction = 'row',
  className,
}: StickyFooterProps) => {
  const directionClass = useMemo(
    () => getDirectionClass(direction),
    [direction]
  );

  return (
    <footer
      className={`${BASE_STICKY_FOOTER_CLASSES} ${directionClass} ${className}`}
    >
      {children}
    </footer>
  );
};

export default StickyFooter;
