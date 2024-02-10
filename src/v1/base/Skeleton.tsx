import { ReactNode } from 'react';

const Skeleton = ({ children }: { children?: ReactNode }) => {
  return <div className="animate-pulse">{children}</div>;
};

type Size = 'small' | 'medium' | 'large';
type XSize = 'xsmall' | 'xlarge';
type XXSize = '2xsmall' | '2xlarge';
type FullSize = 'full';

/** Circle Skeleton */
type CircleSize = Size;

const getCircleSize = (size: CircleSize) => {
  switch (size) {
    case 'large':
      return 'w-[7rem] h-[7rem]';
    case 'medium':
      return 'w-[3.2rem] h-[3.2rem]';
    case 'small':
    default:
      return 'w-[2rem] h-[2rem]';
  }
};

const Circle = ({ size = 'small' }: { size?: CircleSize }) => {
  const sizeClasses = getCircleSize(size);
  return <div className={`rounded-full bg-black-400 ${sizeClasses}`} />;
};

/** Text Skeleton */
type FontSize = Size | XSize | XXSize;

const getTextHeight = (size?: FontSize) => {
  switch (size) {
    case '2xsmall':
      return 'h-[1rem]';
    case 'xsmall':
      return 'h-[1.2rem]';
    case 'small':
      return 'h-[1.4rem]';
    case 'medium':
      return 'h-[1.6rem]';
    case 'large':
      return 'h-[1.8rem]';
    case 'xlarge':
      return 'h-[2rem]';
    case '2xlarge':
      return 'h-[2.2rem]';
    default:
      return 'h-[1.2rem]'; // small
  }
};

const Text = ({
  width,
  fontSize = 'small',
}: {
  width?: string;
  fontSize?: FontSize;
}) => {
  const heightClasses = getTextHeight(fontSize);
  return <div className={`bg-black-400 ${heightClasses}`} style={{ width }} />;
};

/** Rectangle Skelton */
type RoundedSize = Size | FullSize;

const getRoundedSize = (size?: RoundedSize) => {
  switch (size) {
    case 'small':
      return 'rounded-[0.2rem]';
    case 'medium':
      return 'rounded-[0.5rem]';
    case 'large':
      return 'rounded-[2rem]';
    case 'full':
      return 'rounded-full';
    default:
      return 'rounded-none';
  }
};

const Rect = ({
  width,
  height,
  rounded,
}: {
  width?: string;
  height?: string;
  rounded?: RoundedSize;
}) => {
  const roundedClass = getRoundedSize(rounded);
  return (
    <div className={`bg-black-400 ${roundedClass}`} style={{ width, height }} />
  );
};

Skeleton.Circle = Circle;
Skeleton.Text = Text;
Skeleton.Rect = Rect;

export default Skeleton;
