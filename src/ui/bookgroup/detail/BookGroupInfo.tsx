import Image from 'next/image';

import Badge from '@/ui/Base/Badge';
import { IconArrowLeft, IconCalendar, IconMembers } from '@public/icons';
import { toDayFromMillseconds } from '@/utils/date';

interface BookGroupInfoProps {
  title: string;
  description: string;
  book: { title: string; author: string; bookImageSrc: string };
  date: { start: string; end: string };
  memberCount: { current: number; max: number };
  owner: { isMe: boolean; name: string; profileImageSrc: string };
  isPublic: boolean;
}

type BookGroupStatus = 'before' | 'dday' | 'ongoing' | 'end';

const getBookGroupStatus = (ddayByStart: number, ddayByEnd: number) => {
  if (ddayByStart > 0) {
    return {
      status: 'before' as const,
      ddayCount: ddayByStart,
    };
  } else if (ddayByStart === 0 && ddayByEnd > 0) {
    return {
      status: 'dday' as const,
    };
  } else if (ddayByStart < 0 && ddayByEnd >= 0) {
    return {
      status: 'ongoing' as const,
    };
  } else {
    return {
      status: 'end' as const,
    };
  }
};

const BookGroupInfo = ({
  title,
  description,
  book,
  date,
  memberCount,
  owner,
  isPublic,
}: BookGroupInfoProps) => {
  const ddayByStart = toDayFromMillseconds(
    new Date(date.start).getTime() - new Date().getTime()
  );
  const ddayByEnd = toDayFromMillseconds(
    new Date(date.end).getTime() - new Date().getTime()
  );

  console.log(ddayByStart, ddayByEnd);
  const { ...ddayProps } = getBookGroupStatus(ddayByStart, ddayByEnd);

  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex gap-[0.5rem]">
        <Dday {...ddayProps} />
        <Public isPublic={isPublic} />
      </div>
      <Owner
        name={owner.name}
        isMe={owner.isMe}
        profileImageSrc={owner.profileImageSrc}
      />
      <Title title={title} />
      <BookInfoCard
        title={book.title}
        bookImageSrc={book.bookImageSrc}
        author={book.author}
      />
      <div className="flex flex-col gap-[0.3rem]">
        <Duration start={date.start} end={date.end} />
        <MemberCapacity current={memberCount.current} max={memberCount.max} />
      </div>
      <Description content={description} />
    </div>
  );
};

export default BookGroupInfo;

const getDdayBadgeInfo = (status: BookGroupStatus, ddayCount?: number) => {
  switch (status) {
    case 'before':
      return {
        colorScheme: 'main' as const,
        isFilled: true,
        text: `D-${ddayCount}`,
      };
    case 'dday':
      return {
        colorScheme: 'main' as const,
        isFilled: false,
        text: 'D-day',
      };
    case 'ongoing':
      return {
        colorScheme: 'main' as const,
        isFilled: true,
        text: '진행중',
      };
    case 'end':
      return {
        colorScheme: 'grey' as const,
        isFilled: true,
        text: '모임종료',
      };
  }
};

const Dday = ({
  status,
  ddayCount,
}: {
  status: BookGroupStatus;
  ddayCount?: number;
}) => {
  const { text, ...badgeProps } = getDdayBadgeInfo(status, ddayCount);

  return <Badge {...badgeProps}>{text}</Badge>;
};

const Public = ({ isPublic }: { isPublic: boolean }) => (
  <Badge colorScheme="grey">{isPublic ? '공개' : '비공개'}</Badge>
);

const Owner = ({
  profileImageSrc,
  name,
  isMe,
}: {
  profileImageSrc?: string;
  name: string;
  isMe: boolean;
}) => {
  return (
    <div className="flex items-center gap-[1rem]">
      {/** FIXME: Avatar 컴포넌트로 변경 */}
      <span
        className={`relative h-[3.5rem] w-[3.5rem] rounded-full ${
          profileImageSrc ? 'bg-white' : 'bg-black-400'
        }`}
      >
        {profileImageSrc && <Image alt={name} src={profileImageSrc} fill />}
      </span>
      <span className="text-center text-sm font-bold">
        {name} {isMe && ' 👑'}
      </span>
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <p className="text-xl font-bold">{title}</p>;
};

const BookInfoCard = ({
  bookImageSrc,
  title,
  author,
}: {
  bookImageSrc: string;
  title: string;
  author: string;
}) => {
  return (
    <div className="flex min-h-[10rem] w-full gap-[2.4rem] rounded-[0.5rem] border-[0.05rem] border-cancel px-[2.2rem] py-[1.8rem]">
      <span className="relative h-[8.7rem] w-[6.4rem]">
        {bookImageSrc && (
          <Image
            src={bookImageSrc}
            alt={title}
            fill
            className="object-fit rounded-[0.5rem] shadow-[0_0_0.5rem_0.2rem_rgba(0,0,0,0.2)]"
          />
        )}
      </span>

      <div className="flex flex-grow flex-col">
        <span className="text-sm font-bold">{title}</span>
        <span className="text-2xs text-placeholder">{author}</span>
      </div>

      {/** 왼쪽 방향의 화살표를 180도 회전하여 사용 */}
      <span className="h-[1.5rem] w-[1.5rem] rotate-180">
        <IconArrowLeft />
      </span>
    </div>
  );
};

const Duration = ({ start, end }: { start: string; end: string }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <span className="h-auto w-[1.6rem] fill-placeholder">
        <IconCalendar />
      </span>
      <span className="text-sm text-placeholder">
        {start} - {end}
      </span>
    </div>
  );
};

const MemberCapacity = ({ current, max }: { current: number; max: number }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <span className="h-auto w-[1.6rem] fill-placeholder">
        <IconMembers />
      </span>
      <span className="text-sm text-placeholder">
        <span className="text-main-900">{current}</span>
        {` / ${max}명`}
      </span>
    </div>
  );
};

const Description = ({ content }: { content: string }) => {
  return <p className="text-md leading-snug">{content}</p>;
};
