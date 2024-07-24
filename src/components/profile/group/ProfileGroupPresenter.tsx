import { APIGroup } from '@/types/group';
import { APIUser } from '@/types/user';
import SimpleBookGroupCard from '@/components/bookGroup/SimpleBookGroupCard';
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
      <Link
        href={`/profile/${userId}/group`}
        className="flex w-fit items-center gap-[0.5rem]"
      >
        <h3 className="font-body1-bold">참여한 모임</h3>
        <IconArrowRight height="1.3rem" width="1.3rem" />
      </Link>

      {bookGroups.length > 0 ? (
        <ul className="relative left-0 flex w-[calc(100%+2rem)] gap-[1rem] overflow-y-hidden overflow-x-scroll pb-[1.5rem] pr-[2rem]">
          {bookGroups.map(
            ({ bookGroupId, title, owner, book: { imageUrl } }) => (
              <li key={bookGroupId}>
                <SimpleBookGroupCard
                  title={title}
                  imageSource={imageUrl}
                  isOwner={!!isGroupOwner && isGroupOwner(owner.id)}
                  bookGroupId={bookGroupId}
                />
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="py-[4rem] text-center text-placeholder font-body2-regular">
          참여 중인 모임이 없어요.
        </p>
      )}
    </div>
  );
};

export default ProfileGroupPresenter;
