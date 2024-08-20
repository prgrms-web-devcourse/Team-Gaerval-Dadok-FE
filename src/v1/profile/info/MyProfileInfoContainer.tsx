import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileInfoPresenter from './ProfileInfoPresenter';

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

  return <ProfileInfoPresenter {...data}></ProfileInfoPresenter>;
};

export default MyProfileContainer;
