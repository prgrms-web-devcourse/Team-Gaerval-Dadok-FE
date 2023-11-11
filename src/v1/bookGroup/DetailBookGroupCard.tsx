import Image from 'next/image';

import Badge from '@/ui/Base/Badge';
import Avatar from '@/ui/Base/Avatar';
import { IconCalendar, IconMembers, IconComments } from '@public/icons';
import BookGroupStatus from './BookGroupStatus';

interface DetailBookGroupCardProps {
  title: string;
  description: string;
  book: { title: string; bookImageSrc: string };
  date: { start: string; end: string };
  owner: { name: string; profileImageSrc: string };
  memberCount: number;
  commentCount: number;
  isPublic: boolean;
  handleClick: () => void;
}

type BookGroupStatus = 'before' | 'dday' | 'ongoing' | 'end';

const DetailBookGroupCard = ({
  title,
  description,
  book,
  date,
  owner,
  memberCount,
  commentCount,
  isPublic,
  handleClick,
}: DetailBookGroupCardProps) => {
  return (
    <div
      onClick={handleClick}
      className="h-[16.142rem] w-[35.5rem] rounded-[0.4rem] px-[1.6rem] py-[0.9rem] shadow-[0_0_0.6rem_rgba(180,180,180,0.25)]"
    >
      <div className="mb-[1rem] flex gap-[0.5rem]">
        <BookGroupStatus start={date.start} end={date.end} />
        <Public isPublic={isPublic} />
      </div>
      <div className="flex gap-[1.4rem]">
        <div className="flex flex-col gap-[0.63rem]">
          <Title title={title} />
          <Description description={description} />
          <Duration start={date.start} end={date.end} />
          <div className="flex w-[22.5rem] justify-between">
            <Owner name={owner.name} profileImageSrc={owner.profileImageSrc} />
            <div className="flex gap-[0.5rem]">
              <MemberCount memberCount={memberCount} />
              <CommentCount commentCount={commentCount} />
            </div>
          </div>
        </div>
        <div>
          <Book title={book.title} bookImageSrc={book.bookImageSrc} />
        </div>
      </div>
    </div>
  );
};

export default DetailBookGroupCard;

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
    <div className="w-[22.5rem] truncate text-sm">
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
  name: string;
  profileImageSrc: string;
}) => {
  return (
    <div className="flex h-[2rem] gap-[0.5rem]">
      <Avatar name={name} src={profileImageSrc} size="small" />
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

const Book = ({
  bookImageSrc,
  title,
}: {
  bookImageSrc: string;
  title: string;
}) => {
  return (
    <div>
      <div className="relative h-[10.442rem] w-[8rem]">
        {bookImageSrc && (
          <Image
            src={bookImageSrc}
            alt={title}
            fill
            className="object-fit rounded-[0.4rem] shadow-[0.1rem_0.2rem_0.4rem_0_rgba(0,0,0,0.25)]"
          />
        )}
      </div>
    </div>
  );
};
