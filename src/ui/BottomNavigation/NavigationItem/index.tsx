import { Box, Flex, useTheme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { SVGProps } from 'react';

interface NavigationItemPorps {
  iconName: string;
  label: string;
  href: string;
  isActive: boolean;
}

const NavigationItem = ({
  iconName,
  label,
  href,
  isActive,
}: NavigationItemPorps) => {
  const theme = useTheme();
  const color = isActive ? theme.colors.main : theme.colors.black['900'];

  const Icon = dynamic<SVGProps<SVGSVGElement>>(
    () => import(`@/../public/icons/${iconName}.svg`)
  );

  return (
    <Link href={href}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="0.8rem"
        cursor="pointer"
      >
        <Box w="2rem" h="2rem" position="relative">
          <Icon strokeWidth={0} fill={color} />
        </Box>
        <Box color={color}>{label}</Box>
      </Flex>
    </Link>
  );
};

export default NavigationItem;
