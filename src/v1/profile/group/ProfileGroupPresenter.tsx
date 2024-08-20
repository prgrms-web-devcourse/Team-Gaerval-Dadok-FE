import { APIGroup } from '@/types/group';
import { APIUser } from '@/types/user';
import SimpleBookGroupCard from '@/v1/bookGroup/SimpleBookGroupCard';
import { IconArrowRight } from '@public/icons';
import Link from 'next/link';

interface ProfileGroupPresenterProps {
  userId: 'me' | APIUser['userId'];
  bookGroups: APIGroup[];
}

const ProfileGroupPresenter = ({
  userId,
  bookGroups,
}: ProfileGroupPresenterProps) => {
  return (
    <div className="flex flex-col gap-[0.6rem]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">참여한 모임</h3>
        <Link href={`/profile/${userId}/group`}>
          <IconArrowRight height="1.8rem" width="1.8rem" />
        </Link>
      </div>

      <ul className="flex gap-[1rem] overflow-scroll">
        {bookGroups.map(({ bookGroupId, title, book: { imageUrl } }) => (
          <li key={bookGroupId}>
            <SimpleBookGroupCard
              title={title}
              imageSource={imageUrl}
              isOwner={false}
              bookGroupId={bookGroupId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileGroupPresenter;
