import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import ProfileInfoPresenter from '@/components/profile/info/ProfileInfoPresenter';

const MyProfileContainer = () => {
  const { data } = useMyProfileQuery();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const {
      nickname,
      job: { jobGroupName, jobName },
    } = data;
    const isSavedAdditionalInfo = !!(nickname && jobGroupName && jobName);
    if (!isSavedAdditionalInfo) replace(`${pathname}/add`);
  }, [data, pathname, replace]);

  return <ProfileInfoPresenter {...data} />;
};

export default MyProfileContainer;
