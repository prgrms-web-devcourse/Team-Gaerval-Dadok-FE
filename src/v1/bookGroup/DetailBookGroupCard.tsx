import Image from 'next/image';

import Badge from '@/ui/Base/Badge';
import { IconCalendar, IconMembers, IconComments } from '@public/icons';
import BookCover from '@/v1/book/BookCover';

interface DetailBookGroupCardProps {
  title: string;
  description: string;
  bookImageSrc: string;
  date: { start: string; end: string };
  owner: { name: string | null; profileImageSrc: string };
  memberCount: number;
  commentCount: number;
  isPublic: boolean;
  onClick?: () => void;
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

const toDayFromMillseconds = (value: number) => {
  return Math.ceil(value / (1000 * 60 * 60 * 24));
};

const DetailBookGroupCard = ({
  title,
  description,
  bookImageSrc,
  date,
  owner,
  memberCount,
  commentCount,
  isPublic,
  onClick,
}: DetailBookGroupCardProps) => {
  const ddayByStart = toDayFromMillseconds(
    new Date(date.start).getTime() - new Date().getTime()
  );
  const ddayByEnd = toDayFromMillseconds(
    new Date(date.end).getTime() - new Date().getTime()
  );

  const { ...ddayProps } = getBookGroupStatus(ddayByStart, ddayByEnd);

  return (
    <div
      onClick={onClick}
      className="min-h-[16.142rem] w-full rounded-[0.4rem] px-[1.6rem] py-[0.9rem] shadow-[0_0_0.6rem_rgba(180,180,180,0.25)]"
    >
      <div className="mb-[1rem] flex gap-[0.5rem]">
        <Dday {...ddayProps} />
        <Public isPublic={isPublic} />
      </div>
      <div className="flex justify-between gap-[1.5rem]">
        <div className="flex flex-grow flex-col gap-[0.63rem]">
          <Title title={title} />
          <Description description={description} />
          <Duration start={date.start} end={date.end} />
          <div className="flex justify-between">
            <Owner name={owner.name} profileImageSrc={owner.profileImageSrc} />
            <div className="flex gap-[0.5rem]">
              <MemberCount memberCount={memberCount} />
              <CommentCount commentCount={commentCount} />
            </div>
          </div>
        </div>
        <BookCover src={bookImageSrc} size="medium" />
      </div>
    </div>
  );
};

export default DetailBookGroupCard;

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

  return (
    <Badge size="large" {...badgeProps}>
      {text}
    </Badge>
  );
};

const Public = ({ isPublic }: { isPublic: boolean }) => (
  <Badge size="large" colorScheme="grey">
    {isPublic ? '공개' : '비공개'}
  </Badge>
);

const Title = ({ title }: { title: string }) => {
  return (
    <div>
      <span className="text-md font-bold">{title}</span>
    </div>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <div className="w-[22rem] truncate text-sm">
      <span>{description}</span>
    </div>
  );
};

const Duration = ({ start, end }: { start: string; end: string }) => {
  return (
    <div className="flex items-center gap-[0.5rem]">
      <div>
        <IconCalendar className="h-[1.161rem] w-[1.1rem] fill-placeholder" />
      </div>
      <div className="text-xs text-placeholder">
        <span className="pt-[0.1rem]">
          {start} - {end}
        </span>
      </div>
    </div>
  );
};

const Owner = ({
  name,
  profileImageSrc,
}: {
  name: string | null;
  profileImageSrc: string;
}) => {
  return (
    <div className="flex h-[2rem] gap-[0.5rem]">
      {/* 아바타 컴포넌트로 변경 예정 */}
      <div className={'relative h-[2rem] w-[2rem] rounded-full bg-black-400'}>
        {profileImageSrc && (
          <Image alt={name ? name : ''} src={profileImageSrc} fill />
        )}
      </div>
      <div className="flex items-center text-xs">
        <span>{name}</span>
      </div>
    </div>
  );
};

const MemberCount = ({ memberCount }: { memberCount: number }) => {
  return (
    <div className="flex items-center gap-[0.3rem]">
      <span className="h-auto w-[1.3rem] fill-placeholder">
        <IconMembers className="h-[0.9rem] w-[1.3rem] fill-placeholder" />
      </span>
      <span className="text-xs text-placeholder">
        <span className="text-placeholder">{memberCount}</span>
      </span>
    </div>
  );
};

const CommentCount = ({ commentCount }: { commentCount: number }) => {
  return (
    <div className="flex items-center gap-[0.3rem]">
      <div className="h-auto w-[1.3rem] fill-placeholder">
        <IconComments className="h-[1.2rem] w-[1.2rem] fill-placeholder" />
      </div>
      <span className="text-xs text-placeholder">
        <span className="text-placeholder">{commentCount}</span>
      </span>
    </div>
  );
};
