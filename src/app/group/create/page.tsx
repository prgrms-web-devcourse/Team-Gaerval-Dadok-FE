'use client';

import withAuthRequired from '@/hocs/withAuthRequired';

import CreateBookGroupFunnel from '@/v1/bookGroup/create/CreateBookGroupFunnel';

const GroupCreateFunnelPage = () => {
  return <CreateBookGroupFunnel />;
};

export default withAuthRequired(GroupCreateFunnelPage);
