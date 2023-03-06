import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { MouseEvent, SVGProps } from 'react';

interface NavigationItemPorps {
  iconName: string;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: (event: MouseEvent) => void;
}

const NavigationItem = ({
  iconName,
  label,
  href,
  isActive,
  onClick,
}: NavigationItemPorps) => {
  const theme = useTheme();
  const color = isActive ? theme.colors.main : theme.colors.black['900'];

  const Icon = dynamic<SVGProps<SVGSVGElement>>(
    () => import(`@/../public/icons/${iconName}.svg`)
  );

  return (
    <Link onClick={onClick} href={href}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="0.6rem"
        cursor="pointer"
      >
        <Box w="2.6rem" h="2.6rem" position="relative">
          <Icon width="100%" height="100%" strokeWidth={0} fill={color} />
        </Box>
        <Text fontSize="sm" fontWeight="bold" color={color}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export default NavigationItem;
