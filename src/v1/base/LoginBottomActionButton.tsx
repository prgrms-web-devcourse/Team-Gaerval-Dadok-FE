import Link from 'next/link';

import { KAKAO_LOGIN_URL } from '@/constants';
import BottomActionButton from './BottomActionButton';

const LoginBottomActionButton = () => (
  <Link href={KAKAO_LOGIN_URL}>
    <BottomActionButton>로그인 및 회원가입</BottomActionButton>
  </Link>
);

export default LoginBottomActionButton;
