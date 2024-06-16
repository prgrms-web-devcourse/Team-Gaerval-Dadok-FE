import { usePathname, useRouter } from 'next/navigation';

import useJoinBookGroup from '@/hooks/group/useJoinBookGroup';
import BottomActionButton from '@/components/common/BottomActionButton';

const JoinBookGroupButton = ({ groupId }: { groupId: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isExpired, isMember, hasPassword, joinBookGroup, refetch } =
    useJoinBookGroup(groupId);

  const handleButtonClick = async () => {
    if (hasPassword) {
      router.replace(`${pathname}/join`);
      return;
    }

    joinBookGroup({ onSuccess: refetch });
  };

  if (isMember) {
    return null;
  }

  if (isExpired) {
    return (
      <BottomActionButton colorScheme="grey" disabled>
        모임이 종료되었어요.
      </BottomActionButton>
    );
  }

  return (
    <BottomActionButton onClick={handleButtonClick}>
      참여하기
    </BottomActionButton>
  );
};

export default JoinBookGroupButton;
