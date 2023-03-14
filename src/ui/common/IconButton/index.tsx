import dynamic from 'next/dynamic';
import { ComponentPropsWithoutRef, SVGProps } from 'react';
import { Center } from '@chakra-ui/react';

interface Props extends ComponentPropsWithoutRef<typeof Center> {
  name: IconNameType;
  size?: number | string;
  strokeWidth?: string;
  color?: string /** hex */;
  fill?: boolean;
}

const IconButton = ({
  name,
  size = '2.4rem',
  strokeWidth = '0',
  color = '#000',
  fill = false,
  ...props
}: Props) => {
  const Icon = dynamic<SVGProps<SVGSVGElement>>(
    () => import(`@/../public/icons/${name}.svg`)
  );

  return (
    <Center
      as="button"
      width={size}
      height={size}
      background="transparent"
      _hover={{ bg: 'transparent' }}
      {...props}
    >
      <Icon
        width="100%"
        height="100%"
        stroke={color}
        strokeWidth={strokeWidth}
        fill={fill ? color : 'transparent'}
      />
    </Center>
  );
};

type IconNameType =
  | 'close'
  | 'back'
  | 'book'
  | 'search'
  | 'bookmark'
  | 'more'
  | 'more-circle'
  | 'job-card';

export default IconButton;
