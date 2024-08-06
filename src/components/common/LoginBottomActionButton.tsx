import StickyFooter from '@/components/common/StickyFooter';
import LoginLink from '@/components/common/LoginLink';
import Button from '@/components/common/Button';

const LoginBottomActionButton = () => (
  <LoginLink>
    <StickyFooter>
      <Button size="full">로그인 및 회원가입</Button>
    </StickyFooter>
  </LoginLink>
);

export default LoginBottomActionButton;
