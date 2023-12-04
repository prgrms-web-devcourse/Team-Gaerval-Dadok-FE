import Link from 'next/link';

import { IconArrowLeft, IconCalendar, IconMembers } from '@public/icons';
import Badge from '@/v1/base/Badge';
import Avatar from '@/v1/base/Avatar';
import BookCover from '@/v1/book/BookCover';
import BookGroupStatus from '@/v1/bookGroup/BookGroupStatus';

import useBookInfoQuery from '@/queries/book/useBookInfoQuery';
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
      <span className="text-center text-sm font-bold">
        <span>{userInfo.nickname}</span>
        <span>{isMe && ' 👑'}</span>
      </span>
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <p className="text-xl font-bold">{title}</p>;
};

const BookInfoCard = ({ bookId }: { bookId: number }) => {
  const { data: bookInfo } = useBookInfoQuery(bookId);

  return (
    <Link href={`/book/${bookId}`}>
      <div className="flex min-h-[11rem] w-full cursor-pointer gap-[2.4rem] rounded-[0.5rem] border-[0.05rem] border-cancel px-[2.2rem] py-[1.8rem]">
        <BookCover
          size="xsmall"
          src={bookInfo.imageUrl}
          title={bookInfo.title}
        />
        <div className="flex min-w-0 flex-grow flex-col">
          <span className="truncate text-sm font-bold">{bookInfo.title}</span>
          <span className="text-xs text-placeholder">{bookInfo.author}</span>
        </div>
        {/** 왼쪽 방향의 화살표를 180도 회전하여 사용 */}
        <IconArrowLeft className="h-[1.5rem] w-[1.5rem] flex-shrink-0 rotate-180" />
      </div>
    </Link>
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
      <p className="text-sm text-placeholder">
        <span className="text-main-900">{current}</span>
        {`${max ? ` / ${max}` : ''}명`}
      </p>
    </div>
  );
};

const Description = ({ content }: { content: string }) => {
  return <p className="text-md leading-snug">{content}</p>;
};
