import { IconArrowLeft, IconCalendar, IconMembers } from '@public/icons';
import Badge from '@/ui/Base/Badge';
import Avatar from '@/ui/Base/Avatar';
import BookCover from '@/v1/book/BookCover';
import BookGroupStatus from '@/v1/bookGroup/BookGroupStatus';

import useBookInfoQuery from '@/queries/book/useBookInfoQuery';
import { useBookGroup } from '@/queries/group/useBookGroupQuery';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';

type BookGroupInfoProps = { groupId: number };

const BookGroupInfo = ({ groupId }: BookGroupInfoProps) => {
  const { data: bookGroupInfo } = useBookGroup(groupId);

  return (
    <div className="flex flex-col gap-[1rem] py-[2rem]">
      {bookGroupInfo && (
        <>
          <div className="flex gap-[0.5rem]">
            <BookGroupStatus
              start={bookGroupInfo.date.start}
              end={bookGroupInfo.date.end}
            />
            <Public isPublic={bookGroupInfo.isPublic} />
          </div>
          <Owner
            userId={bookGroupInfo.owner.id}
            isMe={bookGroupInfo.owner.isMe}
          />
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
        </>
      )}
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
      {userInfo && (
        <>
          <Avatar
            name={userInfo.nickname}
            size="medium"
            src={userInfo.profileImage}
          />
          <span className="text-center text-sm font-bold">
            {userInfo.nickname} {isMe && ' 👑'}
          </span>
        </>
      )}
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <p className="text-xl font-bold">{title}</p>;
};

const BookInfoCard = ({ bookId }: { bookId: number }) => {
  const { data: bookInfo } = useBookInfoQuery(bookId);

  return (
    <div className="flex min-h-[10rem] w-full cursor-pointer gap-[2.4rem] rounded-[0.5rem] border-[0.05rem] border-cancel px-[2.2rem] py-[1.8rem]">
      {bookInfo && (
        <>
          <BookCover
            size="xsmall"
            src={bookInfo.imageUrl}
            title={bookInfo.title}
          />
          <div className="flex flex-grow flex-col">
            <span className="text-sm font-bold">{bookInfo.title}</span>
            <span className="text-xs text-placeholder">{bookInfo.author}</span>
          </div>
          {/** 왼쪽 방향의 화살표를 180도 회전하여 사용 */}
          <IconArrowLeft className="h-[1.5rem] w-[1.5rem] rotate-180" />
        </>
      )}
    </div>
  );
};

const Duration = ({ start, end }: { start: string; end: string }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <IconCalendar className="h-auto w-[1.6rem] fill-placeholder" />
      <span className="text-sm text-placeholder">
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
      <span className="text-sm text-placeholder">
        <span className="text-main-900">{current}</span>
        {`${max ? ` / ${max}` : ''}명`}
      </span>
    </div>
  );
};

const Description = ({ content }: { content: string }) => {
  return <p className="text-md leading-snug">{content}</p>;
};
