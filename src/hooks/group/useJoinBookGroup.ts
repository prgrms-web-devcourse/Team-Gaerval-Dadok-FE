import { isAxiosErrorWithCustomCode } from '@/utils/helpers';
import { SERVICE_ERROR_MESSAGE } from '@/constants';
import groupAPI from '@/apis/group';
import useToast from '@/components/common/Toast/useToast';
import { useBookGroupJoinInfo } from '@/queries/group/useBookGroupQuery';

const useJoinBookGroup = (groupId: number) => {
  const { data: bookGroupJoinData, refetch } = useBookGroupJoinInfo(groupId);
  const { isExpired, isMember, hasPassword, question } = bookGroupJoinData;

  const toast = useToast();

  const joinBookGroup = async ({
    answer,
    onSuccess,
  }: {
    answer?: string;
    onSuccess?: () => void;
  }) => {
    try {
      await groupAPI.joinGroup({ bookGroupId: groupId, password: answer });
      toast.show({ message: '🎉 모임에 가입되었어요! 🎉', type: 'success' });
      onSuccess && onSuccess();
    } catch (error) {
      if (!isAxiosErrorWithCustomCode(error)) {
        toast.show({ message: '잠시 후 다시 시도해주세요', type: 'error' });
        return;
      }

      const { code } = error.response.data;
      const message = SERVICE_ERROR_MESSAGE[code];
      const isWrongAnswerErrorCode = code === 'BG3';

      if (isWrongAnswerErrorCode) {
        toast.show({
          message: '정답이 아니에요. 다시 시도해주세요!',
          type: 'error',
        });
        return;
      }

      toast.show({ message, type: 'error' });
    }
  };

  return {
    isExpired,
    isMember,
    hasPassword,
    question,
    refetch,
    joinBookGroup,
  };
};

export default useJoinBookGroup;
