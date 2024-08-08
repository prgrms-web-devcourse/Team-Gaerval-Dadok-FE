import StickyFooter from '@/components/common/StickyFooter';
import LoginLink from '@/components/common/LoginLink';
import Button from '@/components/common/Button';

const LoginBottomActionButton = () => (
  <StickyFooter>
    <LoginLink className="w-full">
      <Button size="full">로그인 및 회원가입</Button>
    </LoginLink>
  </StickyFooter>
);

export default LoginBottomActionButton;
