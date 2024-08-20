'use client';

import withAuthRequired from '@/hocs/withAuthRequired';

import CreateBookGroupFunnel from '@/components/bookGroup/create/CreateBookGroupFunnel';

const GroupCreateFunnelPage = () => {
  return <CreateBookGroupFunnel />;
};

export default withAuthRequired(GroupCreateFunnelPage);
