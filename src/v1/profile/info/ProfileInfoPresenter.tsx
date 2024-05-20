import type { APIUser } from '@/types/user';
import Avatar from '@/v1/base/Avatar';
import Badge from '@/v1/base/Badge';

type ProfileInfoProps = Pick<APIUser, 'nickname' | 'profileImage' | 'job'>;

const ProfileInfoPresenter = ({
  nickname,
  profileImage,
  job: { jobGroupKoreanName, jobNameKoreanName },
}: ProfileInfoProps) => {
  return (
    <div className="mb-[2rem] flex flex-col gap-[2rem]">
      <div className="flex gap-[0.8rem]">
        <Badge
          colorScheme="main"
          isFilled={false}
          size="large"
          fontWeight="bold"
        >
          {jobGroupKoreanName}
        </Badge>
        <Badge
          colorScheme="main"
          isFilled={false}
          size="large"
          fontWeight="bold"
        >
          {jobNameKoreanName}
        </Badge>
      </div>
      <div className="flex items-center gap-[1rem]">
        <Avatar src={profileImage} size="large" />
        <h2 className="font-subheading-regular">
          <b>{nickname}</b>님의 공간
        </h2>
      </div>
    </div>
  );
};

export default ProfileInfoPresenter;
