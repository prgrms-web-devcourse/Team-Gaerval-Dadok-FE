import Image from 'next/image';

import { IconHamburger } from '@public/icons';

type BookGroupComment = {
  id: number;
  writer: { id: number; profileImageSrc: string; name: string };
  createdAt: string;
  content: string;
};

interface BookGroupCommentProps {
  comments: BookGroupComment[];
}

const BookGroupComment = ({ comments }: BookGroupCommentProps) => {
  return (
    <div className="flex flex-col gap-[1rem]">
      {/* FIXME: Heading 컴포넌트 페이지 단으로 빼기 */}
      <Heading text="게시글" />

      {comments.map(({ id, writer, createdAt, content }) => (
        <div className="flex flex-col gap-[2rem] pt-[1rem]" key={id}>
          <div className="flex gap-[1rem]">
            <Avatar
              profileImageSrc={writer.profileImageSrc}
              name={writer.name}
            />
            <div className="flex flex-grow flex-col">
              <Name name={writer.name} />
              <Date date={createdAt} />
            </div>
            <MenuButton />
          </div>
          <Comment content={content} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default BookGroupComment;

const Heading = ({ text }: { text: string }) => (
  <p className="text-xl font-bold">{text}</p>
);

// FIXME: Avatar Base 컴포넌트로 변경
const Avatar = ({
  profileImageSrc,
  name,
}: {
  profileImageSrc: string;
  name: string;
}) => (
  <span
    className={`relative h-[3.5rem] w-[3.5rem] self-center rounded-full ${
      profileImageSrc ? 'bg-white' : 'bg-black-400'
    }`}
  >
    {profileImageSrc && (
      <Image alt={name} src={profileImageSrc} fill className="rounded-full" />
    )}
  </span>
);

const Name = ({ name }: { name: string }) => (
  <p className="text-sm font-bold">{name}</p>
);

const Date = ({ date }: { date: string }) => (
  <p className="text-xs text-placeholder">{date}</p>
);

const MenuButton = () => {
  return (
    <span className="inline-block h-[2rem] w-[2rem] cursor-pointer">
      <IconHamburger />
    </span>
  );
};

const Comment = ({ content }: { content: string }) => (
  <p className="text-justify text-md">{content}</p>
);

const Divider = () => <p className=" border-b-black100 border-[0.05rem]"></p>;
