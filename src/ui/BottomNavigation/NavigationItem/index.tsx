import { Box, Flex, useTheme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const theme = useTheme();
  const color = isActive ? theme.colors.main : theme.colors.black['900'];

  const Icon = dynamic<SVGProps<SVGSVGElement>>(
    () => import(`@/../public/icons/${iconName}.svg`)
  );

  const onNavigationItemClick = () => {
    router.push(href);
  };

  return (
    <Flex
      direction="column"
      justify="cneter"
      align="center"
      gap="0.8rem"
      cursor="pointer"
      onClick={onNavigationItemClick}
    >
      <Box w="2rem" h="2rem" position="relative">
        <Icon strokeWidth={0} fill={color} />
      </Box>
      <Box color={color}>{label}</Box>
    </Flex>
  );
};

export default NavigationItem;
