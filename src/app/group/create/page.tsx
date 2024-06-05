'use client';

import withAuthRequired from '@/hocs/withAuthRequired';

import CreateBookGroupFunnel from '@/v1/bookGroup/create/CreateBookGroupFunnel';

const GroupCreateFunnelPage = () => {
  const AuthRequiredCreateBookGroupFunnel = withAuthRequired(
    CreateBookGroupFunnel
  );

  return <AuthRequiredCreateBookGroupFunnel />;
};

export default GroupCreateFunnelPage;
