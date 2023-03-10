import AuthRequired from '@/ui/AuthRequired';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthRequired>{children}</AuthRequired>;
};

export default Layout;
