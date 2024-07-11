'use client';

import type { ComponentPropsWithRef, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SEARCH_PARAMS_KEYS } from '@/constants/key';
import { KAKAO_LOGIN_BASE_URL } from '@/constants/url';
import { createQueryString } from '@/utils/url';

type LoginLinkProps = Omit<ComponentPropsWithRef<typeof Link>, 'href'>;

const LoginLink = ({
  children,
  replace = true,
  ...props
}: PropsWithChildren<LoginLinkProps>) => {
  const pathname = usePathname();
  const search = createQueryString({
    ...(pathname && { [SEARCH_PARAMS_KEYS.REDIRECT_PATHNAME]: pathname }),
  });

  return (
    <Link
      href={`${KAKAO_LOGIN_BASE_URL}${search}`}
      replace={replace}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LoginLink;
