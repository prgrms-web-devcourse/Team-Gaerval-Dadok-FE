import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import userAPI from '@/apis/user';

const RedirectPage = async () => {
  const accessToken = cookies().get(process.env.DADOK_TOKEN_KEY as string);
  console.log(cookies());
  if (!accessToken) {
    notFound();
  }

  const { data } = await userAPI.getMyProfile({
    headers: { Authorization: `Bearers ${accessToken.value}` },
  });

  const shouldAddProfile = !data.nickname || !data.job.jobGroupName;

  if (shouldAddProfile) {
    redirect('/profile/me/add');
  } else {
    redirect('/bookarchive');
  }
};

export default RedirectPage;
