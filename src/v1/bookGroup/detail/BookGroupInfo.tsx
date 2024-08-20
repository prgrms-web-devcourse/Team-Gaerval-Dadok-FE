import Image from 'next/image';

import Badge from '@/ui/Base/Badge';
import BookCover from '@/ui/book/BookCover';
import BookGroupStatus from '@/v1/bookGroup/BookGroupStatus';
import { IconArrowLeft, IconCalendar, IconMembers } from '@public/icons';
import { DATA_URL } from '@/constants/dataUrl';

interface BookGroupInfoProps {
  title: string;
  description: string;
  book: { title: string; author: string; bookImageSrc: string };
  date: { start: string; end: string };
  memberCount: { current: number; max: number };
  owner: { isMe: boolean; name: string; profileImageSrc: string };
  isPublic: boolean;
}

const BookGroupInfo = ({
  title,
  description,
  book,
  date,
  memberCount,
  owner,
  isPublic,
}: BookGroupInfoProps) => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex gap-[0.5rem]">
        <BookGroupStatus start={date.start} end={date.end} />
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

const Public = ({ isPublic }: { isPublic: boolean }) => (
  <Badge colorScheme="grey">{isPublic ? '공개' : '비공개'}</Badge>
);

const Owner = ({
  profileImageSrc,
  name,
  isMe,
}: {
  profileImageSrc: string;
  name: string;
  isMe: boolean;
}) => {
  return (
    <div className="flex items-center gap-[1rem]">
      {/** FIXME: Avatar 컴포넌트로 변경 */}
      <Image
        width={32}
        height={32}
        alt={name}
        src={profileImageSrc}
        className="rounded-full"
        placeholder="blur"
        blurDataURL={DATA_URL['placeholder']}
      />
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
    <div className="flex min-h-[10rem] w-full cursor-pointer gap-[2.4rem] rounded-[0.5rem] border-[0.05rem] border-cancel px-[2.2rem] py-[1.8rem]">
      <BookCover size="xsmall" src={bookImageSrc} title={title} />
      <div className="flex flex-grow flex-col">
        <span className="text-sm font-bold">{title}</span>
        <span className="text-xs text-placeholder">{author}</span>
      </div>
      {/** 왼쪽 방향의 화살표를 180도 회전하여 사용 */}
      <IconArrowLeft className="h-[1.5rem] w-[1.5rem] rotate-180" />
    </div>
  );
};

const Duration = ({ start, end }: { start: string; end: string }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <IconCalendar className="h-auto w-[1.6rem] fill-placeholder" />
      <span className="text-sm text-placeholder">
        {start} - {end}
      </span>
    </div>
  );
};

const MemberCapacity = ({ current, max }: { current: number; max: number }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <IconMembers className="h-auto w-[1.6rem] fill-placeholder" />
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
