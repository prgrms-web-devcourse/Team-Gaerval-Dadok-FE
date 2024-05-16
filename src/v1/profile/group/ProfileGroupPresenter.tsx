import { APIGroup } from '@/types/group';
import { APIUser } from '@/types/user';
import SimpleBookGroupCard from '@/v1/bookGroup/SimpleBookGroupCard';
import { IconArrowRight } from '@public/icons';
import Link from 'next/link';

interface ProfileGroupPresenterProps {
  userId: 'me' | APIUser['userId'];
  bookGroups: APIGroup[];
  isGroupOwner?: (ownerId: number) => boolean;
}

const ProfileGroupPresenter = ({
  userId,
  bookGroups,
  isGroupOwner,
}: ProfileGroupPresenterProps) => {
  return (
    <div className="mt-[0.5rem] flex flex-col gap-[1.5rem]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">참여한 모임</h3>
        <Link href={`/profile/${userId}/group`}>
          <IconArrowRight height="1.8rem" width="1.8rem" />
        </Link>
      </div>

      <ul className="w-app flex gap-[1rem] overflow-y-hidden overflow-x-scroll px-[2rem]">
        {bookGroups.map(({ bookGroupId, title, owner, book: { imageUrl } }) => (
          <li key={bookGroupId}>
            <SimpleBookGroupCard
              title={title}
              imageSource={imageUrl}
              isOwner={!!isGroupOwner && isGroupOwner(owner.id)}
              bookGroupId={bookGroupId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileGroupPresenter;
