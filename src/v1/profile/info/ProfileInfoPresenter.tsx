import type { APIUser } from '@/types/user';
import Avatar from '@/v1/base/Avatar';
import Badge from '@/v1/base/Badge';

type ProfileInfoProps = Pick<APIUser, 'nickname' | 'profileImage' | 'job'>;

// COMMENT: 프로필 정보 조회 API 스키마 변경으로 email, oauthnickname props 제거
const ProfileInfoPresenter = ({
  nickname,
  profileImage,
  job: { jobGroupKoreanName, jobNameKoreanName },
}: ProfileInfoProps) => {
  return (
    <div className="flex flex-col gap-[2rem] mb-[2rem]">
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
        <h2 className="text-lg">
          <b>{nickname}</b>님의 공간
        </h2>
      </div>
    </div>
  );
};

export default ProfileInfoPresenter;
