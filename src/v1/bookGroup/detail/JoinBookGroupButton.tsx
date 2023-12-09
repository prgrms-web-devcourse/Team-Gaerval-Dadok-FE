import { usePathname, useRouter } from 'next/navigation';

import { SERVICE_ERROR_MESSAGE } from '@/constants';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';

import { useBookGroupJoinInfo } from '@/queries/group/useBookGroupQuery';
import groupAPI from '@/apis/group';
import useToast from '@/v1/base/Toast/useToast';
import BottomActionButton from '@/v1/base/BottomActionButton';

const JoinBookGroupButton = ({ groupId }: { groupId: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  const {
    data: { isExpired, isMember, hasPassword },
    refetch,
  } = useBookGroupJoinInfo(groupId);

  const joinBookGroup = async () => {
    try {
      await groupAPI.joinGroup({ bookGroupId: groupId });
      toast.show({ message: '모임에 가입했어요!', type: 'success' });
      refetch();
    } catch (error) {
      if (!isAxiosErrorWithCustomCode(error)) {
        toast.show({ message: '잠시 후 다시 시도해주세요.', type: 'error' });
        return;
      }

      const { code } = error.response.data;
      const message = SERVICE_ERROR_MESSAGE[code];

      toast.show({ message, type: 'error' });
    }
  };

  const handleButtonClick = async () => {
    if (hasPassword) {
      router.push(`${pathname}/join`);
      return;
    }

    joinBookGroup();
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
