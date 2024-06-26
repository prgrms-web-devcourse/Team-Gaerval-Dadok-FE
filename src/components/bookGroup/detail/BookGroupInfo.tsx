import { IconCalendar, IconMembers } from '@public/icons';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';
import BookGroupStatus from '@/components/bookGroup/BookGroupStatus';
import BookInfoCard from '@/components/bookGroup/BookInfoCard';

import { useBookGroup } from '@/queries/group/useBookGroupQuery';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';

const BookGroupInfo = ({ groupId }: { groupId: number }) => {
  const { data: bookGroupInfo } = useBookGroup(groupId);

  return (
    <div className="flex flex-col gap-[1rem] pt-[2rem]">
      <div className="flex gap-[0.5rem]">
        <BookGroupStatus
          start={bookGroupInfo.date.start}
          end={bookGroupInfo.date.end}
        />
        <Public isPublic={bookGroupInfo.isPublic} />
      </div>
      <Owner userId={bookGroupInfo.owner.id} isMe={bookGroupInfo.owner.isMe} />
      <Title title={bookGroupInfo.title} />
      <BookInfoCard bookId={bookGroupInfo.bookId} />
      <div className="flex flex-col gap-[0.3rem]">
        <Duration
          start={bookGroupInfo.date.start}
          end={bookGroupInfo.date.end}
        />
        <MemberCapacity
          current={bookGroupInfo.memberCount.current}
          max={bookGroupInfo.memberCount.max}
        />
      </div>
      <Description content={bookGroupInfo.description} />
    </div>
  );
};

export default BookGroupInfo;

const Public = ({ isPublic }: { isPublic: boolean }) => (
  <Badge colorScheme="grey">{isPublic ? '공개' : '비공개'}</Badge>
);

const Owner = ({
  userId,
  isMe = false,
}: {
  userId: number;
  isMe?: boolean;
}) => {
  const { data: userInfo } = useUserProfileQuery(userId);

  return (
    <div className="flex items-center gap-[1rem]">
      <Avatar
        name={userInfo.nickname}
        size="medium"
        src={userInfo.profileImage}
      />
      <span className="text-center font-body2-bold">
        <span>{userInfo.nickname}</span>
        <span>{isMe && ' 👑'}</span>
      </span>
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <p className="font-subheading-bold">{title}</p>;
};

const Duration = ({ start, end }: { start: string; end: string }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <IconCalendar className="h-auto w-[1.6rem] fill-placeholder" />
      <span className="text-placeholder font-body2-regular">
        {start} ~ {end}
      </span>
    </div>
  );
};

const MemberCapacity = ({
  current,
  max,
}: {
  current: number;
  max: number | null;
}) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <IconMembers className="h-auto w-[1.6rem] fill-placeholder" />
      <p className="text-placeholder font-body2-regular">
        <span className="text-main-900">{current}</span>
        {`${max ? ` / ${max}` : ''}명`}
      </p>
    </div>
  );
};

const Description = ({ content }: { content: string }) => {
  return <p className="leading-snug font-body1-regular">{content}</p>;
};
