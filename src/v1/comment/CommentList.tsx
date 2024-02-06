import type { Writer } from '@/types/user';

import Avatar from '@/v1/base/Avatar';
import Menu from '@/v1/base/Menu';

type Comment = {
  id: number;
  writer: Writer;
  createdAt: string;
  content: string;
};

interface CommentListProps {
  comments: Comment[];
  hidden?: boolean;
  hiddenText?: string;
  emptyText?: string;
  editableComment?: (writerId: Writer['id']) => boolean;
}

const CommentList = ({
  comments,
  hidden,
  hiddenText,
  emptyText,
  editableComment,
}: CommentListProps) => {
  if (hidden) {
    return <p className="py-[2rem] text-center text-sm">{hiddenText}</p>;
  }

  if (comments.length === 0) {
    return (
      <p className="self-center whitespace-pre-line py-[2rem] text-center text-sm">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-[1rem]">
      {comments.map(({ id, writer, createdAt, content }) => (
        <div className="flex flex-col gap-[1rem] py-[1rem]" key={id}>
          <div className="flex gap-[1rem]">
            <Avatar
              src={writer.profileImageSrc}
              name={writer.name}
              size="medium"
            />
            <div className="flex flex-grow flex-col">
              <Name name={writer.name} />
              <Date date={createdAt} />
            </div>
            {editableComment && editableComment(writer.id) && <MenuButton />}
          </div>
          <CommentContent content={content} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;

const Name = ({ name }: { name: string }) => (
  <p className="text-sm font-bold">{name}</p>
);

const Date = ({ date }: { date: string }) => (
  <p className="text-xs text-placeholder">{date}</p>
);

const MenuButton = () => {
  return (
    <Menu>
      <Menu.Toggle />
      <Menu.DropdownList>
        <Menu.Item>수정하기</Menu.Item>
        <Menu.Item>삭제하기</Menu.Item>
      </Menu.DropdownList>
    </Menu>
  );
};

const CommentContent = ({ content }: { content: string }) => (
  <p className="text-justify text-md">{content}</p>
);
